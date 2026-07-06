import { Router, RequestHandler } from "express";
import { promises as fs } from "fs";
import path from "path";

const router = Router();

// Map of editable token groups — these are the semantic tokens exposed in the editor
export const EDITABLE_TOKEN_GROUPS = [
  {
    id: "primary",
    label: "Primary Action",
    tokens: [
      { name: "--ld-semantic-color-action-fill-primary", label: "Fill" },
      { name: "--ld-semantic-color-action-fill-primary-hovered", label: "Fill Hovered" },
      { name: "--ld-semantic-color-action-fill-primary-pressed", label: "Fill Pressed" },
      { name: "--ld-semantic-color-action-text-on-fill-primary", label: "Text on Fill" },
    ],
  },
  {
    id: "secondary",
    label: "Secondary Action",
    tokens: [
      { name: "--ld-semantic-color-action-fill-secondary", label: "Fill" },
      { name: "--ld-semantic-color-action-border-secondary", label: "Border" },
      { name: "--ld-semantic-color-action-text-secondary", label: "Text" },
    ],
  },
  {
    id: "brand",
    label: "Brand",
    tokens: [
      { name: "--ld-semantic-color-text-brand", label: "Brand Text" },
      { name: "--ld-semantic-color-border-brand", label: "Brand Border" },
      { name: "--ld-semantic-color-border-activated", label: "Activated Border" },
    ],
  },
  {
    id: "top-nav",
    label: "Top Navigation",
    tokens: [
      { name: "--ld-semantic-color-top-nav-fill", label: "Background" },
      { name: "--ld-semantic-color-top-nav-fill-hovered", label: "Background Hovered" },
      { name: "--ld-semantic-color-top-nav-fill-pressed", label: "Background Pressed" },
      { name: "--ld-semantic-color-top-nav-separator", label: "Separator" },
      { name: "--ld-semantic-color-top-nav-text-on-fill", label: "Text" },
      { name: "--ld-semantic-color-top-nav-text-on-fill-hovered", label: "Text Hovered" },
      { name: "--ld-semantic-color-top-nav-app-name", label: "App Name Color" },
    ],
  },
  {
    id: "bottom-nav",
    label: "Bottom Navigation",
    tokens: [
      { name: "--wcp-semantic-color-bottom-nav-fill-brand", label: "Background" },
      { name: "--wcp-semantic-color-bottom-nav-text-on-fill-brand", label: "Text" },
    ],
  },
  {
    id: "destructive",
    label: "Destructive Action",
    tokens: [
      { name: "--ld-semantic-color-action-fill-destructive", label: "Fill" },
      { name: "--ld-semantic-color-action-fill-destructive-hovered", label: "Fill Hovered" },
      { name: "--ld-semantic-color-action-text-on-fill-destructive", label: "Text on Fill" },
    ],
  },
  {
    id: "wcp-commerce",
    label: "WCP Commerce",
    tokens: [
      { name: "--wcp-semantic-color-action-fill-primary-alt", label: "Spark Alt (Primary Action)" },
      { name: "--wcp-semantic-color-fill-savings-bold", label: "Savings Bold" },
      { name: "--wcp-semantic-color-fill-savings-subtle", label: "Savings Subtle" },
      { name: "--wcp-semantic-color-fill-confidence", label: "Confidence" },
      { name: "--wcp-semantic-color-fill-confidence-subtle", label: "Confidence Subtle" },
      { name: "--wcp-semantic-color-fill-urgent", label: "Urgent" },
      { name: "--wcp-semantic-color-fill-holiday-member", label: "Holiday Member" },
      { name: "--wcp-semantic-color-fill-social", label: "Social" },
    ],
  },
  {
    id: "page-nav",
    label: "Page Navigation",
    tokens: [
      { name: "--ld-semantic-color-side-nav-fill-selected", label: "Selected Background" },
      { name: "--ld-semantic-color-side-nav-fill-hovered", label: "Hover Background" },
      { name: "--ld-semantic-color-side-nav-text-selected", label: "Selected Text" },
      { name: "--ld-semantic-color-side-nav-text", label: "Default Text" },
    ],
  },
];

// Allowed theme IDs (must match directory names under public/styles/themes/)
const ALLOWED_THEMES = new Set([
  "walmart", "walmart-b2b", "wcp", "ax", "ax-sams-club", "ax-walmart",
  "px", "px-sams-club", "px-walmart", "data-ventures",
  "sams-club", "cashi-mx", "bodega", "walmart-legacy", "walmart-plus",
  "sparky", "members-mark", "base", "associate", "developer",
  "customer", "partner",
]);

function getSemanticCSSPath(themeId: string): string {
  return path.resolve(process.cwd(), "public", "styles", "themes", themeId, "semantic.css");
}

/**
 * Parse a CSS file and extract all --custom-property: value pairs
 */
async function parseTokensFromCSS(filePath: string): Promise<Record<string, string>> {
  let content: string;
  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch {
    return {};
  }

  const tokens: Record<string, string> = {};
  // Match lines like:   --token-name: value;
  const tokenRegex = /^\s*(--[\w-]+)\s*:\s*(.+?)\s*;/gm;
  let match: RegExpExecArray | null;
  while ((match = tokenRegex.exec(content)) !== null) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}

/**
 * Write or update token values in a CSS file's :root block.
 * If a token already exists in the file, its value is updated in-place.
 * If it doesn't exist, it is inserted/appended into the :root block.
 */
async function writeTokensToCSS(
  filePath: string,
  updates: Record<string, string>
): Promise<void> {
  let content: string;
  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch {
    // File doesn't exist yet — create a minimal one
    content = `:root {\n}\n`;
  }

  // Update existing tokens in-place
  const updated = new Set<string>();
  let result = content.replace(
    /^(\s*)(--[\w-]+)(\s*:\s*)(.+?)(\s*;)/gm,
    (match, indent, name, sep, _val, semi) => {
      if (name in updates) {
        updated.add(name);
        return `${indent}${name}${sep}${updates[name]}${semi}`;
      }
      return match;
    }
  );

  // Append tokens that weren't in the file yet, inside the :root block
  const newTokens = Object.entries(updates).filter(([name]) => !updated.has(name));
  if (newTokens.length > 0) {
    const insertion = newTokens.map(([name, value]) => `  ${name}: ${value};`).join("\n");
    // Insert just before the closing brace of the first :root block
    result = result.replace(/(\n\s*\})/, `\n${insertion}$1`);
  }

  // Ensure the directory exists before writing
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, result, "utf-8");
}

/**
 * GET /api/themes/:themeId/tokens
 * Returns the current values of editable tokens for the given theme.
 * Values come from the theme's own semantic.css only (not resolved via inheritance).
 */
const getTokens: RequestHandler = async (req, res) => {
  const { themeId } = req.params;

  if (!ALLOWED_THEMES.has(themeId)) {
    res.status(400).json({ error: "Invalid theme ID" });
    return;
  }

  const filePath = getSemanticCSSPath(themeId);
  const tokens = await parseTokensFromCSS(filePath);

  // Return all editable token names + their values (undefined = not set in this file)
  const allNames = EDITABLE_TOKEN_GROUPS.flatMap((g) => g.tokens.map((t) => t.name));
  const result: Record<string, string | null> = {};
  for (const name of allNames) {
    result[name] = tokens[name] ?? null;
  }

  res.json({ themeId, tokens: result, groups: EDITABLE_TOKEN_GROUPS });
};

/**
 * POST /api/themes/:themeId/tokens
 * Writes updated token values into the theme's semantic.css file.
 * Body: { tokens: Record<tokenName, value> }
 */
const updateTokens: RequestHandler = async (req, res) => {
  const { themeId } = req.params;

  if (!ALLOWED_THEMES.has(themeId)) {
    res.status(400).json({ error: "Invalid theme ID" });
    return;
  }

  const { tokens } = req.body as { tokens: Record<string, string> };
  if (!tokens || typeof tokens !== "object") {
    res.status(400).json({ error: "Body must be { tokens: Record<string, string> }" });
    return;
  }

  // Validate that only known token names are provided
  const allowedNames = new Set(
    EDITABLE_TOKEN_GROUPS.flatMap((g) => g.tokens.map((t) => t.name))
  );
  const filtered: Record<string, string> = {};
  for (const [name, value] of Object.entries(tokens)) {
    if (allowedNames.has(name) && typeof value === "string") {
      filtered[name] = value;
    }
  }

  const filePath = getSemanticCSSPath(themeId);
  await writeTokensToCSS(filePath, filtered);

  res.json({ success: true, themeId, updated: Object.keys(filtered) });
};

router.get("/:themeId/tokens", getTokens);
router.post("/:themeId/tokens", updateTokens);

export { router as themeRouter };

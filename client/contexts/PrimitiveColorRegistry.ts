/**
 * PrimitiveColorRegistry
 * Reads all --ld-primitive-color-* tokens from the document's computed styles at runtime.
 * Groups them by hue for display in the color picker.
 */

export interface PrimitiveColor {
  /** Full CSS variable name e.g. "--ld-primitive-color-blue-100" */
  name: string;
  /** Resolved hex/rgb value e.g. "#0053e2" */
  value: string;
  /** Short label e.g. "blue-100" */
  label: string;
  /** Hue group e.g. "blue" */
  group: string;
  /** Numeric step within the group (5, 10, 20…) for sorting */
  step: number;
}

export interface PrimitiveColorGroup {
  id: string;
  label: string;
  colors: PrimitiveColor[];
}

// Ordered list of groups we want to display
const GROUP_ORDER = [
  "white",
  "black",
  "blue",
  "cyan",
  "gray",
  "green",
  "orange",
  "pink",
  "purple",
  "red",
  "spark",
  "teal",
  "yellow",
  "magic",
];

// Human-readable labels for each group
const GROUP_LABELS: Record<string, string> = {
  white: "White",
  black: "Black",
  blue: "Blue",
  cyan: "Cyan",
  gray: "Gray",
  green: "Green",
  orange: "Orange",
  pink: "Pink",
  purple: "Purple",
  red: "Red",
  spark: "Spark Yellow",
  teal: "Teal",
  yellow: "Yellow",
  magic: "Magic",
};

let _cachedGroups: PrimitiveColorGroup[] | null = null;

/**
 * Read all --ld-primitive-color-* tokens from computed styles.
 * Results are cached after the first call.
 */
export function getPrimitiveColorGroups(): PrimitiveColorGroup[] {
  if (_cachedGroups) return _cachedGroups;

  const styles = getComputedStyle(document.documentElement);
  const map = new Map<string, PrimitiveColor[]>();

  // Enumerate all CSS custom properties from the stylesheet rules
  const allNames = getAllPrimitiveColorNames();

  for (const name of allNames) {
    const value = styles.getPropertyValue(name).trim();
    if (!value) continue;

    // Parse group and step from name: --ld-primitive-color-{group}-{step}
    const match = name.match(/^--ld-primitive-color-([a-z]+)-?(\d+)?$/);
    if (!match) continue;

    const group = match[1];
    const step = match[2] ? parseInt(match[2], 10) : 0;
    const label = match[2] ? `${group}-${match[2]}` : group;

    if (!map.has(group)) map.set(group, []);
    map.get(group)!.push({ name, value, label, group, step });
  }

  // Sort colors within each group by step
  const groups: PrimitiveColorGroup[] = [];
  for (const groupId of GROUP_ORDER) {
    const colors = map.get(groupId);
    if (!colors || colors.length === 0) continue;
    colors.sort((a, b) => a.step - b.step);
    groups.push({
      id: groupId,
      label: GROUP_LABELS[groupId] ?? groupId,
      colors,
    });
  }

  // Add any groups not in our ordered list at the end
  for (const [groupId, colors] of map.entries()) {
    if (!GROUP_ORDER.includes(groupId)) {
      colors.sort((a, b) => a.step - b.step);
      groups.push({ id: groupId, label: groupId, colors });
    }
  }

  _cachedGroups = groups;
  return groups;
}

/**
 * Bust the cache — call this after theme switches so tokens re-resolve.
 */
export function invalidatePrimitiveColorCache(): void {
  _cachedGroups = null;
}

/**
 * Look up a PrimitiveColor by its CSS variable name.
 */
export function getPrimitiveByName(name: string): PrimitiveColor | undefined {
  const styles = getComputedStyle(document.documentElement);
  const value = styles.getPropertyValue(name).trim();
  if (!value) return undefined;
  const match = name.match(/^--ld-primitive-color-([a-z]+)-?(\d+)?$/);
  if (!match) return undefined;
  const group = match[1];
  const step = match[2] ? parseInt(match[2], 10) : 0;
  const label = match[2] ? `${group}-${match[2]}` : group;
  return { name, value, label, group, step };
}

/**
 * Given a semantic token value like "var(--ld-primitive-color-blue-100, #0053e2)",
 * extract the primitive token name.
 */
export function extractPrimitiveName(tokenValue: string): string | null {
  const match = tokenValue.match(/var\((--ld-primitive-color-[\w-]+)/);
  return match ? match[1] : null;
}

/**
 * Format a primitive color reference as a CSS value string.
 * e.g. "var(--ld-primitive-color-blue-100, #0053e2)"
 */
export function formatPrimitiveRef(primitive: PrimitiveColor): string {
  return `var(${primitive.name}, ${primitive.value})`;
}

// ─── Internal helpers ────────────────────────────────────────────────────────

/**
 * Walk all loaded stylesheets to collect --ld-primitive-color-* property names.
 * This avoids needing to maintain a hardcoded list.
 */
function getAllPrimitiveColorNames(): string[] {
  const names = new Set<string>();
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList;
      try {
        rules = sheet.cssRules;
      } catch {
        // Cross-origin sheet — skip
        continue;
      }
      for (const rule of Array.from(rules)) {
        if (!(rule instanceof CSSStyleRule)) continue;
        const text = rule.style.cssText;
        const matches = text.matchAll(/(--ld-primitive-color-[\w-]+)\s*:/g);
        for (const m of matches) {
          names.add(m[1]);
        }
      }
    }
  } catch {
    // In some environments styleSheets may not be accessible
  }
  return Array.from(names);
}

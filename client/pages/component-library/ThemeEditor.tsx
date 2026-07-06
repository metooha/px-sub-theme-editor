import React, { useRef, useCallback, useState } from "react";
import { RotateCcw, Upload, Download, CloudUploadFill, ChevronUp, ChevronDown } from "@/components/icons";
import styles from "./ThemeEditor.module.css";
import { useThemeEditor } from "@/hooks/useThemeEditor";
import { TokenSection, type TokenDef } from "@/components/theme-editor/TokenSection";
import { PreviewPanel } from "@/components/theme-editor/PreviewPanel";
import { PagePreview } from "@/components/theme-editor/PagePreview";
import { SeedColorSection, SEEDS } from "@/components/theme-editor/SeedColorSection";
import { Button } from "@/components/ui/Button";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Select, SelectItem, SelectLabel } from "@/components/ui/Select";
import { useTheme } from "@/contexts/ThemeContext";
import { resolveHexFromPrimitiveVar } from "@/components/theme-editor/primitiveColorTokens";

// ─── Advanced token groups (fine-grained overrides) ──────────────────────────

const TOKEN_GROUPS: { id: string; title: string; tokens: TokenDef[]; defaultOpen?: boolean }[] = [
  {
    id: "primary",
    title: "Primary Action",
    defaultOpen: false,
    tokens: [
      { token: "--ld-semantic-color-action-fill-primary", label: "Fill" },
      { token: "--ld-semantic-color-action-fill-primary-hovered", label: "Fill Hovered" },
      { token: "--ld-semantic-color-action-fill-primary-pressed", label: "Fill Pressed" },
      { token: "--ld-semantic-color-action-text-on-fill-primary", label: "Text on Fill" },
      { token: "--ld-semantic-color-action-focus-outline", label: "Focus Outline" },
    ],
  },
  {
    id: "secondary",
    title: "Secondary Action",
    defaultOpen: false,
    tokens: [
      { token: "--ld-semantic-color-action-fill-secondary", label: "Fill" },
      { token: "--ld-semantic-color-action-border-secondary", label: "Border" },
      { token: "--ld-semantic-color-action-text-secondary", label: "Text" },
    ],
  },
  {
    id: "brand",
    title: "Brand",
    tokens: [
      { token: "--ld-semantic-color-text-brand", label: "Brand Text" },
      { token: "--ld-semantic-color-border-brand", label: "Brand Border" },
      { token: "--ld-semantic-color-border-activated", label: "Activated Border" },
    ],
  },
  {
    id: "top-nav",
    title: "Top Navigation",
    tokens: [
      { token: "--ld-semantic-color-top-nav-fill", label: "Background" },
      { token: "--ld-semantic-color-top-nav-fill-hovered", label: "Background Hovered" },
      { token: "--ld-semantic-color-top-nav-fill-pressed", label: "Background Pressed" },
      { token: "--ld-semantic-color-top-nav-separator", label: "Separator" },
      { token: "--ld-semantic-color-top-nav-text-on-fill", label: "Text + Icons" },
      { token: "--ld-semantic-color-top-nav-text-on-fill-hovered", label: "Text Hovered" },
      { token: "--ld-semantic-color-top-nav-app-name", label: "App Name Color" },
    ],
  },
  {
    id: "bottom-nav",
    title: "Bottom Navigation",
    tokens: [
      { token: "--wcp-semantic-color-bottom-nav-fill-brand", label: "Background" },
      { token: "--wcp-semantic-color-bottom-nav-text-on-fill-brand", label: "Icon + Text" },
    ],
  },
  {
    id: "page-nav",
    title: "Page Navigation",
    tokens: [
      { token: "--ld-semantic-color-side-nav-fill-selected", label: "Selected Background" },
      { token: "--ld-semantic-color-side-nav-fill-hovered", label: "Hover Background" },
      { token: "--ld-semantic-color-side-nav-text-selected", label: "Selected Text" },
      { token: "--ld-semantic-color-side-nav-text", label: "Default Text" },
    ],
  },
];

// ─── Seed → preview card mapping ─────────────────────────────────────────────

const SEED_TO_PREVIEW: Record<string, string> = {
  primary: "preview-buttons",
  "top-nav": "preview-top-nav",
  surface: "preview-card",
};

const GROUP_TO_PREVIEW: Record<string, string> = {
  primary: "preview-buttons",
  secondary: "preview-buttons",
  brand: "preview-badges-tags",
  "top-nav": "preview-top-nav",
  "bottom-nav": "preview-footer",
  "page-nav": "preview-footer",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

// ── Theme palette data ───────────────────────────────────────────────────────
const TC_STORAGE_KEY = "theme-creator-v3";
interface SavedTheme { id: string; name: string; type: string; seeds?: Record<string, string>; colors: string[] }

// Default themes — matching project ThemeRegistry. Seed values reflect the
// inheritance model: brand colours that point at a base primitive resolve to the
// base value (e.g. Cashi/Data Ventures purple → base purple-100 #63327e).
// Core brands — ship their own brand identity / primitive overrides.
const BRAND_THEMES: SavedTheme[] = [
  { id: "walmart",       name: "Walmart",          type: "brand", colors: ["#0053e2","#ffc220","#74767c","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#0053e2",  secondary:"#ffc220", neutral:"#74767c", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
  { id: "sams-club",     name: "Sam's Club",       type: "brand", colors: ["#0062ad","#0086ed","#74767c","#2a8703","#df2c2c","#ffc220"],
    seeds: { primary:"#0062ad",  secondary:"#0086ed", neutral:"#74767c", positive:"#2a8703", negative:"#df2c2c", warning:"#ffc220" } },
  { id: "cashi-mx",      name: "Cashi MX",         type: "brand", colors: ["#63327e","#0086ed","#74767c","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#63327e",  secondary:"#0086ed", neutral:"#74767c", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
  { id: "bodega",        name: "Bodega",           type: "brand", colors: ["#2a8703","#fa6400","#74767c","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#2a8703",  secondary:"#fa6400", neutral:"#74767c", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
];

// Tenants — Walmart base with semantic-token overrides (editable in Theme Editor).
const TENANT_THEMES: SavedTheme[] = [
  { id: "walmart-b2b",   name: "Walmart Business", type: "tenant", colors: ["#002e99","#ffc220","#74767c","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#002e99",  secondary:"#ffc220", neutral:"#74767c", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
  { id: "walmart-legacy",name: "Walmart Legacy",   type: "tenant", colors: ["#0053e2","#ffc220","#74767c","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#0053e2",  secondary:"#ffc220", neutral:"#74767c", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
  { id: "walmart-plus",  name: "Walmart W+",       type: "tenant", colors: ["#0053e2","#fff200","#74767c","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#0053e2",  secondary:"#fff200", neutral:"#74767c", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
  { id: "sparky",        name: "Sparky",           type: "tenant", colors: ["#001e60","#00a9c6","#74767c","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#001e60",  secondary:"#00a9c6", neutral:"#74767c", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
  { id: "data-ventures", name: "Data Ventures",    type: "tenant", colors: ["#63327e","#0053e2","#74767c","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#63327e",  secondary:"#0053e2", neutral:"#74767c", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
  { id: "members-mark",  name: "Member's Mark",    type: "tenant", colors: ["#283645","#0062ad","#5a6672","#2a8703","#ea1100","#ffc220"],
    seeds: { primary:"#283645",  secondary:"#0062ad", neutral:"#5a6672", positive:"#2a8703", negative:"#ea1100", warning:"#ffc220" } },
];

function loadCustomThemes(): SavedTheme[] {
  try { const s = localStorage.getItem(TC_STORAGE_KEY); return s ? JSON.parse(s) : []; } catch { return []; }
}

export default function ThemeEditor() {
  const editor = useThemeEditor();
  const { currentTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewTab, setPreviewTab] = useState<"components" | "page">("components");
  const [pageDevice, setPageDevice] = useState<"desktop" | "mobile">("desktop");
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [seedResetKey, setSeedResetKey] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customThemes] = useState<SavedTheme[]>(() => loadCustomThemes());
  const allPaletteThemes = [...BRAND_THEMES, ...TENANT_THEMES, ...customThemes];
  const [appliedTheme, setAppliedTheme] = useState<string | null>(null);

  // ── Export JSON ──────────────────────────────────────────────────────────
  const handleExport = useCallback(() => {
    const json = editor.exportJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `theme-overrides-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [editor]);

  // ── Import JSON ──────────────────────────────────────────────────────────
  const handleImportClick = () => fileInputRef.current?.click();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result;
        if (typeof text === "string") {
          editor.importJSON(text);
        }
      };
      reader.readAsText(file);
      e.target.value = "";
    },
    [editor]
  );

  // ── Save to CSS file ─────────────────────────────────────────────────────
  const handleSaveToFile = useCallback(async () => {
    if (editor.overrideCount === 0) return;
    try {
      const res = await fetch(`/api/themes/${currentTheme}/tokens`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokens: editor.overrides }),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
    } catch (err) {
      console.error("Failed to save theme tokens:", err);
    }
  }, [editor.overrides, editor.overrideCount, currentTheme]);

  // ── Reset all (also resets seed UI state) ────────────────────────────────
  const handleResetAll = useCallback(() => {
    editor.resetAll();
    setSeedResetKey((k) => k + 1);
    setActiveGroupId(null);
    setAppliedTheme(null);
  }, [editor]);

  // ── Apply a palette from Theme Creator ───────────────────────────────────
  const handleApplyTheme = useCallback((theme: SavedTheme) => {
    if (!theme.seeds) return;
    const seedIdToKey: Record<string, string> = {
      primary: 'primary', secondary: 'secondary', neutral: 'neutral',
      positive: 'positive', negative: 'negative', warning: 'warning',
    };
    SEEDS.forEach((seedDef) => {
      const key = seedIdToKey[seedDef.id];
      if (!key || !theme.seeds![key]) return;
      const rawValue = theme.seeds![key];
      const hex = rawValue.startsWith('var(') ? resolveHexFromPrimitiveVar(rawValue) : rawValue;
      if (!hex) return;
      const derived = seedDef.derive(hex);
      Object.entries(derived).forEach(([token, value]) => editor.setOverride(token, value));
    });
    setSeedResetKey((k) => k + 1);
    setAppliedTheme(theme.id);
  }, [editor]);

  // ── Active group handlers ────────────────────────────────────────────────
  const handleGroupActivate = (id: string) => {
    setActiveGroupId(id);
    if (previewTab === "page") setPreviewTab("components");
  };

  const handlePreviewGroupActivate = (groupId: string) => {
    setActiveGroupId(groupId);
  };

  // ── Seed change → highlight preview ─────────────────────────────────────
  const handleSeedChange = (seedId: string) => {
    const previewId = SEED_TO_PREVIEW[seedId];
    if (previewId) {
      const el = document.getElementById(previewId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    if (previewTab === "page") setPreviewTab("components");
  };

  return (
    <div className={styles.page}>
      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <span
            className={`${styles.overrideBadge} ${
              editor.overrideCount === 0 ? styles.overrideBadgeNone : ""
            }`}
          >
            {editor.overrideCount === 0
              ? "No overrides active"
              : `${editor.overrideCount} override${editor.overrideCount === 1 ? "" : "s"} active`}
          </span>

          {editor.importError && (
            <span className={`${styles.statusMsg} ${styles.statusError}`}>
              {editor.importError}
            </span>
          )}
          {editor.importSuccess && (
            <span className={`${styles.statusMsg} ${styles.statusSuccess}`}>
              Theme imported successfully
            </span>
          )}
        </div>

        <div className={styles.toolbarRight}>
          <ButtonGroup>
            <Button
              variant="tertiary"
              size="small"
              onClick={handleResetAll}
              disabled={editor.overrideCount === 0}
              leading={<RotateCcw style={{ width: 14, height: 14 }} />}
            >
              Reset all
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={handleImportClick}
              leading={<Upload style={{ width: 14, height: 14 }} />}
            >
              Import JSON
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={handleExport}
              disabled={editor.overrideCount === 0}
              leading={<Download style={{ width: 14, height: 14 }} />}
            >
              Export JSON
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={handleSaveToFile}
              disabled={editor.overrideCount === 0}
              leading={<CloudUploadFill style={{ width: 14, height: 14 }} />}
            >
              Push to theme file
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {/* Hidden file input for import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* ── Body: two-column layout ── */}
      <div className={styles.body}>
        {/* Left: token editor */}
        <div className={styles.leftCol}>
          <div className={styles.colHeader}>
            <h1 className={styles.colTitle}>Theme Overrides</h1>
            <p className={styles.colSubtitle}>
              Set seed colors to update all related components at once, or fine-tune individual tokens below.
            </p>
            {/* Palette selector — brands, tenants & custom themes from Theme Creator */}
            <div className={styles.paletteSelector}>
              <Select
                label="Apply palette"
                size="small"
                placeholder="Select a theme…"
                value={appliedTheme ?? undefined}
                onValueChange={(id) => {
                  const theme = allPaletteThemes.find((t) => t.id === id);
                  if (theme) handleApplyTheme(theme);
                }}
              >
                <SelectLabel>Brands</SelectLabel>
                {BRAND_THEMES.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>
                ))}
                <SelectLabel>Tenants</SelectLabel>
                {TENANT_THEMES.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>
                ))}
                {customThemes.length > 0 && <SelectLabel>Custom</SelectLabel>}
                {customThemes.map((theme) => (
                  <SelectItem key={theme.id} value={theme.id}>{theme.name}</SelectItem>
                ))}
              </Select>
            </div>
          </div>

          <div className={styles.sections}>
            {/* ── Seed color pickers (primitive level) ── */}
            <SeedColorSection
              getCurrentValue={editor.getCurrentValue}
              overrides={editor.overrides}
              onSet={editor.setOverride}
              onReset={editor.resetOverride}
              onSeedChange={handleSeedChange}
              resetKey={seedResetKey}
              appliedThemeSeeds={
                appliedTheme
                  ? allPaletteThemes.find((t) => t.id === appliedTheme)?.seeds ?? null
                  : null
              }
            />

            {/* ── Advanced: individual semantic tokens ── */}
            <div className={styles.advancedToggle}>
              <button
                type="button"
                className={styles.advancedBtn}
                onClick={() => setShowAdvanced((v) => !v)}
                aria-expanded={showAdvanced}
              >
                <span>Advanced token overrides</span>
                <span className={styles.advancedChevron}>
                  {showAdvanced
                    ? <ChevronUp style={{ width: 12, height: 12 }} />
                    : <ChevronDown style={{ width: 12, height: 12 }} />}
                </span>
              </button>
            </div>

            {showAdvanced && TOKEN_GROUPS.map((group) => (
              <TokenSection
                key={group.id}
                id={group.id}
                title={group.title}
                tokens={group.tokens}
                overrides={editor.overrides}
                onSet={editor.setOverride}
                onReset={editor.resetOverride}
                getCurrentValue={editor.getCurrentValue}
                defaultOpen={group.defaultOpen}
                isActive={activeGroupId === group.id}
                onActivate={handleGroupActivate}
              />
            ))}
          </div>
        </div>

        {/* Right: live preview */}
        <div className={styles.rightCol}>
          {/* Tab bar */}
          <div className={styles.previewTabBar}>
            <button
              type="button"
              className={`${styles.previewTab} ${previewTab === "components" ? styles.previewTabActive : ""}`}
              onClick={() => setPreviewTab("components")}
            >
              Components
            </button>
            <button
              type="button"
              className={`${styles.previewTab} ${previewTab === "page" ? styles.previewTabActive : ""}`}
              onClick={() => setPreviewTab("page")}
            >
              Page Example
            </button>
            {previewTab === "page" && (
              <div className={styles.deviceToggleInTab}>
                <SegmentedControl
                  aria-label="Device preview"
                  value={pageDevice}
                  onChange={(v) => setPageDevice(v as "desktop" | "mobile")}
                  items={[
                    { value: "desktop", label: "Desktop" },
                    { value: "mobile",  label: "Mobile"  },
                  ]}
                />
              </div>
            )}
          </div>

          <div className={styles.rightColScroll}>
            {previewTab === "components" ? (
              <PreviewPanel
                overrides={editor.overrides}
                getCurrentValue={editor.getCurrentValue}
                activeGroupId={activeGroupId}
                onGroupActivate={handlePreviewGroupActivate}
              />
            ) : (
              <PagePreview device={pageDevice} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

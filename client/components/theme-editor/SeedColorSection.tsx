/**
 * SeedColorSection — Primitive-level color controls.
 *
 * Each "seed" controls a family of related semantic tokens. Changing one
 * value updates every token in the family at once, e.g. the primary blue
 * controls Button (primary), Switch, Checkbox, Focus ring, Brand text, etc.
 */
import React, { useRef, useState, useEffect, useCallback } from "react";
import { darken, lighten, withAlpha, contrastColor, isDark, ensureContrastOnWhite } from "@/lib/colorUtils";
import { PrimitivePicker } from "./PrimitivePicker";
import {
  resolveHexFromPrimitiveVar,
  findPrimitiveToken,
  parsePrimitiveVar,
  findClosestPrimitiveFamily,
  ALL_PRIMITIVE_TOKENS,
} from "./primitiveColorTokens";
import styles from "./SeedColorSection.module.css";

// ── Seed definitions ──────────────────────────────────────────────────────────

export interface SeedDef {
  id: string;
  label: string;
  description: string;
  /** Short names of affected components shown as pills */
  components: string[];
  /** The canonical token used to read the initial value from the live theme */
  canonicalToken: string;
  /** Derive all affected semantic token overrides from a seed hex */
  derive: (hex: string) => Record<string, string>;
  /** Primitive color families pinned at the top of the picker (fallback when no theme applied) */
  preferredFamilies?: string[];
  /**
   * Theme seed keys whose colors drive the picker's "Recommended" section when
   * a palette is applied, e.g. ["primary", "secondary"].
   */
  themeRecommendKeys?: string[];
  /** Extra families always added to the recommended list when a theme is applied */
  extraRecommendFamilies?: string[];
}

export const SEEDS: SeedDef[] = [
  {
    id: "primary",
    label: "Primary Color",
    description: "Brand & action color — controls all primary interactive elements",
    components: ["Button", "Switch", "Checkbox", "Segmented Control", "Link", "Side Nav", "Focus Ring"],
    canonicalToken: "--ld-semantic-color-action-fill-primary",
    preferredFamilies: ["blue", "magic", "cyan"],
    themeRecommendKeys: ["primary", "secondary"],
    derive: (hex) => ({
      // ── Button / primary action (fill — any shade OK) ──────────────
      "--ld-semantic-color-action-fill-primary":          hex,
      "--ld-semantic-color-action-fill-primary-hovered":  darken(hex, 0.08),
      "--ld-semantic-color-action-fill-primary-pressed":  darken(hex, 0.18),
      // Text ON the fill — auto black/white for contrast
      "--ld-semantic-color-action-text-on-fill-primary":  contrastColor(hex),
      "--ld-semantic-color-action-focus-outline":         withAlpha(hex, 0.35),
      // ── Secondary / ghost action ────────────────────────────────────
      "--ld-semantic-color-action-fill-secondary":        withAlpha(hex, 0.07),
      // Borders / text on white — must pass WCAG AA 3:1 for UI components
      "--ld-semantic-color-action-border-secondary":      ensureContrastOnWhite(hex, 3.0),
      // Text on white — must pass WCAG AA 4.5:1
      "--ld-semantic-color-action-text-secondary":        ensureContrastOnWhite(hex),
      // ── Brand text / borders (appear on white backgrounds) ──────────
      "--ld-semantic-color-text-brand":                   ensureContrastOnWhite(hex),
      "--ld-semantic-color-border-brand":                 ensureContrastOnWhite(hex, 3.0),
      "--ld-semantic-color-border-activated":             ensureContrastOnWhite(hex, 3.0),
      // ── Switch (on state — fill, any shade OK) ──────────────────────
      "--ld-semantic-color-switch-fill-activated":        hex,
      "--ld-semantic-color-switch-fill-activated-hovered": darken(hex, 0.08),
      "--ld-semantic-color-switch-fill-activated-focused": darken(hex, 0.08),
      "--ld-semantic-color-switch-fill-activated-pressed": darken(hex, 0.18),
      // ── SegmentedControl / activated-subtle (bg tints — any shade OK)
      "--ld-semantic-color-fill-activated-subtle":         withAlpha(hex, 0.06),
      "--ld-semantic-color-fill-activated-subtle-hovered": withAlpha(hex, 0.10),
      "--ld-semantic-color-fill-activated-subtle-pressed": withAlpha(hex, 0.16),
      // ── SideNavigation (page-nav) ────────────────────────────────────
      // Background tints — any shade OK
      "--ld-semantic-color-page-nav-fill-activated":          withAlpha(hex, 0.06),
      "--ld-semantic-color-page-nav-fill-activated-hovered":  withAlpha(hex, 0.10),
      "--ld-semantic-color-page-nav-fill-activated-pressed":  withAlpha(hex, 0.16),
      // Indicator bar on white — 3:1 minimum for UI components
      "--ld-semantic-color-page-nav-indicator-activated":         ensureContrastOnWhite(hex, 3.0),
      "--ld-semantic-color-page-nav-indicator-activated-hovered": ensureContrastOnWhite(hex, 3.0),
      "--ld-semantic-color-page-nav-indicator-activated-focused": ensureContrastOnWhite(hex, 3.0),
      "--ld-semantic-color-page-nav-indicator-activated-pressed": ensureContrastOnWhite(darken(hex, 0.08), 3.0),
      // Text on light bg — 4.5:1
      "--ld-semantic-color-page-nav-text-on-fill-activated": ensureContrastOnWhite(hex),
      // ── Legacy side-nav aliases ──────────────────────────────────────
      "--ld-semantic-color-side-nav-fill-selected":  withAlpha(hex, 0.08),
      "--ld-semantic-color-side-nav-text-selected":  ensureContrastOnWhite(hex),
    }),
  },
  {
    id: "top-nav",
    label: "Navigation Color",
    description: "Top navigation bar background and its text/icon colors",
    components: ["Top Nav", "App Bar", "Nav Links"],
    canonicalToken: "--ld-semantic-color-top-nav-fill",
    themeRecommendKeys: ["primary"],
    derive: (hex) => ({
      "--ld-semantic-color-top-nav-fill": hex,
      "--ld-semantic-color-top-nav-fill-hovered": isDark(hex)
        ? lighten(hex, 0.06)
        : darken(hex, 0.06),
      "--ld-semantic-color-top-nav-fill-pressed": isDark(hex)
        ? lighten(hex, 0.12)
        : darken(hex, 0.12),
      "--ld-semantic-color-top-nav-separator": withAlpha(
        isDark(hex) ? "#ffffff" : "#000000",
        0.12
      ),
      "--ld-semantic-color-top-nav-text-on-fill": contrastColor(hex),
      "--ld-semantic-color-top-nav-text-on-fill-hovered": contrastColor(hex),
      "--ld-semantic-color-top-nav-app-name": contrastColor(hex),
    }),
  },
  {
    id: "surface",
    label: "Surface Color",
    description: "Page and card background — the base canvas of every view",
    components: ["Card", "Page", "Modal", "Sheet", "Footer"],
    canonicalToken: "--ld-semantic-color-fill-surface-primary",
    themeRecommendKeys: ["neutral"],
    extraRecommendFamilies: ["white", "black"],
    derive: (hex) => ({
      "--ld-semantic-color-fill-surface-primary": hex,
      "--ld-semantic-color-fill-surface-secondary": isDark(hex)
        ? lighten(hex, 0.06)
        : darken(hex, 0.03),
      "--ld-semantic-color-fill-subtle": isDark(hex)
        ? lighten(hex, 0.1)
        : darken(hex, 0.02),
      "--ld-semantic-color-separator": isDark(hex)
        ? withAlpha("#ffffff", 0.14)
        : withAlpha("#000000", 0.1),
      "--ld-semantic-color-text-primary": isDark(hex) ? "#ffffff" : "#2e2f32",
      "--ld-semantic-color-text-secondary": isDark(hex)
        ? "rgba(255,255,255,0.75)"
        : "#515357",
      "--ld-semantic-color-text-subtle": isDark(hex)
        ? "rgba(255,255,255,0.5)"
        : "#74767c",
    }),
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

interface SeedColorSectionProps {
  getCurrentValue: (token: string) => string;
  overrides: Record<string, string>;
  onSet: (token: string, value: string) => void;
  onReset: (token: string) => void;
  /** Called with list of tokens this seed just changed (for highlighting) */
  onSeedChange?: (seedId: string) => void;
  resetKey?: number; // increment to force-reset seed UI values
  /** Seed colors of the currently applied palette, keyed by theme seed id */
  appliedThemeSeeds?: Record<string, string> | null;
}

export function SeedColorSection({
  getCurrentValue,
  onSet,
  onSeedChange,
  resetKey = 0,
  appliedThemeSeeds,
}: SeedColorSectionProps) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.sectionTitle}>Design Tokens</span>
        <span className={styles.sectionSubtitle}>Change one color — all related components update instantly</span>
      </div>
      <div className={styles.seeds}>
        {SEEDS.map((seed) => (
          <SeedRow
            key={seed.id}
            seed={seed}
            getCurrentValue={getCurrentValue}
            onSet={onSet}
            onSeedChange={onSeedChange}
            resetKey={resetKey}
            appliedThemeSeeds={appliedThemeSeeds}
          />
        ))}
      </div>
    </div>
  );
}

// ── Seed Row ──────────────────────────────────────────────────────────────────

interface SeedRowProps {
  seed: SeedDef;
  getCurrentValue: (token: string) => string;
  onSet: (token: string, value: string) => void;
  onSeedChange?: (seedId: string) => void;
  resetKey: number;
  appliedThemeSeeds?: Record<string, string> | null;
}

function SeedRow({ seed, getCurrentValue, onSet, onSeedChange, resetKey, appliedThemeSeeds }: SeedRowProps) {
  const swatchRef = useRef<HTMLButtonElement>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerPos, setPickerPos] = useState({ top: 0, left: 0 });
  const [expanded, setExpanded] = useState(false);
  // selectedVar: the current primitive var string e.g. "var(--ld-primitive-color-blue-100)"
  const [selectedVar, setSelectedVar] = useState<string | null>(null);

  // Resolve the current hex from the live theme, then find the closest primitive token
  const resolveCurrentHex = useCallback((): string => {
    const raw = getCurrentValue(seed.canonicalToken);
    if (raw.startsWith("#")) return raw;
    const m = raw.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (m) {
      const toHex = (n: number) => n.toString(16).padStart(2, "0");
      return `#${toHex(+m[1])}${toHex(+m[2])}${toHex(+m[3])}`;
    }
    return "#888888";
  }, [getCurrentValue, seed.canonicalToken]);

  const currentHex = resolveCurrentHex();

  // On reset, clear selected var
  useEffect(() => {
    setSelectedVar(null);
  }, [resetKey]); // eslint-disable-line

  // Resolved hex from selected primitive var (or fall back to live value)
  const displayHex = selectedVar
    ? (resolveHexFromPrimitiveVar(selectedVar) ?? currentHex)
    : currentHex;

  // Closest primitive label for display
  const primitiveLabel = selectedVar
    ? (() => {
        const name = parsePrimitiveVar(selectedVar);
        if (!name) return null;
        const tok = findPrimitiveToken(name);
        return tok ? tok.shortName : null;
      })()
    : (() => {
        // Find closest match by hex
        const match = ALL_PRIMITIVE_TOKENS.find(
          (t) => t.hex.toLowerCase() === currentHex.toLowerCase()
        );
        return match ? match.shortName : null;
      })();

  const applyVar = (varString: string) => {
    const hex = resolveHexFromPrimitiveVar(varString);
    if (!hex) return;
    const derived = seed.derive(hex);
    Object.entries(derived).forEach(([token, value]) => onSet(token, value));
    onSeedChange?.(seed.id);
    setSelectedVar(varString);
  };

  const openPicker = () => {
    if (!swatchRef.current) return;
    const rect = swatchRef.current.getBoundingClientRect();
    let left = rect.left + window.scrollX;
    if (left + 360 > window.innerWidth) left = window.innerWidth - 368;
    setPickerPos({ top: rect.bottom + window.scrollY + 6, left });
    setPickerOpen(true);
  };

  const tokenCount = Object.keys(seed.derive(displayHex)).length;

  // Recommended families for the picker. When a palette is applied, derive them
  // from that theme's seed colors; otherwise fall back to the seed's static list.
  const recommendedFamilies = (() => {
    if (!appliedThemeSeeds) return seed.preferredFamilies;
    const fromTheme = (seed.themeRecommendKeys ?? [])
      .map((key) => appliedThemeSeeds[key])
      .filter(Boolean)
      .map((raw) => {
        const hex = raw.startsWith("var(") ? resolveHexFromPrimitiveVar(raw) : raw;
        return hex ? findClosestPrimitiveFamily(hex) : null;
      })
      .filter((f): f is string => Boolean(f));
    const families = Array.from(
      new Set([...fromTheme, ...(seed.extraRecommendFamilies ?? [])])
    );
    return families.length > 0 ? families : seed.preferredFamilies;
  })();

  return (
    <div className={styles.row}>
      <div className={styles.rowMain}>
        {/* Swatch — opens PrimitivePicker */}
        <div className={styles.swatchWrap}>
          <button
            ref={swatchRef}
            type="button"
            className={styles.swatch}
            style={{ background: displayHex }}
            onClick={openPicker}
            aria-label={`Pick primitive for ${seed.label}`}
            title="Select from primitive palette"
          />
        </div>

        {/* Info */}
        <div className={styles.rowInfo}>
          <div className={styles.rowLabelRow}>
            <span className={styles.rowLabel}>{seed.label}</span>
            <button
              type="button"
              className={styles.tokenCount}
              onClick={() => setExpanded((v) => !v)}
              title="Toggle affected tokens"
            >
              {tokenCount} tokens {expanded ? "▴" : "▾"}
            </button>
          </div>
          <div className={styles.pills}>
            {seed.components.map((c) => (
              <span key={c} className={styles.pill}>{c}</span>
            ))}
          </div>
        </div>

        {/* Primitive name / trigger */}
        <button
          type="button"
          className={styles.primitiveLabel}
          onClick={openPicker}
          aria-label={`Select primitive color for ${seed.label}`}
        >
          {primitiveLabel ?? displayHex}
        </button>
      </div>

      {/* Primitive picker popover */}
      {pickerOpen && (
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 9998, width: 0, height: 0 }}>
          <div style={{ position: "absolute", top: pickerPos.top, left: pickerPos.left }}>
            <PrimitivePicker
              value={selectedVar}
              onChange={(val) => {
                applyVar(val);
                setPickerOpen(false);
              }}
              onClose={() => setPickerOpen(false)}
              preferredFamilies={recommendedFamilies}
            />
          </div>
        </div>
      )}

      {/* Expanded token list */}
      {expanded && (
        <div className={styles.tokenList}>
          {Object.keys(seed.derive(currentHex)).map((token) => (
            <div key={token} className={styles.tokenEntry}>
              <div
                className={styles.tokenDot}
                style={{
                  background: (() => {
                    const v = seed.derive(currentHex)[token];
                    return v;
                  })(),
                }}
              />
              <span className={styles.tokenName}>{token.replace("--ld-semantic-color-", "")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

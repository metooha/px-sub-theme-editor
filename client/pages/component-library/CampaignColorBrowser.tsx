/**
 * Campaign Color Browser — a build-your-own palette generator.
 * A matrix of every named colour (columns = hue family, rows = lightness band).
 * Click any swatch (or filter by hue / lightness / search) to add it to the
 * working palette in the right-hand Palettes panel, then save it as a theme.
 */
import React, { useState, useEffect, useMemo } from "react";
import styles from "./ColorBrowser.module.css";
import { Search, Plus } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { FilterChip } from "@/components/ui/FilterChip";
import type { PrimitiveColorFamily } from "../../components/theme-editor/primitiveColorTokens";

// ── Local colour helpers (kept self-contained) ──
function hexToRgb(hex: string) {
  const c = hex.replace("#", "").slice(0, 6);
  const n = parseInt(c, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}
function luminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const lin = (v: number) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function textOn(hex: string): string {
  return luminance(hex) > 0.45 ? "#1a1a1a" : "#ffffff";
}
function normaliseHex(raw: string): string | null {
  const s = raw.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{6}$/.test(s)) return `#${s.toLowerCase()}`;
  if (/^[0-9a-fA-F]{3}$/.test(s)) return `#${s.split("").map((c) => c + c).join("").toLowerCase()}`;
  return null;
}

// Lightness bands grouped by primitive step.
const BANDS: { label: string; steps: number[] }[] = [
  { label: "Very Light", steps: [5, 10, 20] },
  { label: "Light",      steps: [30, 40, 50] },
  { label: "Medium",     steps: [60, 70, 80] },
  { label: "Strong",     steps: [90, 100] },
  { label: "Dark",       steps: [110, 120, 130] },
  { label: "Very Dark",  steps: [140, 150, 160] },
  { label: "Blackish",   steps: [170, 180] },
];

// Display order of hue columns (gray first, then warm → cool).
const FAMILY_ORDER = ["gray", "red", "orange", "spark", "yellow", "green", "teal", "cyan", "blue", "purple", "pink"];

export interface BrowserPalette { id: string; name: string; colors: string[] }

type Bg = "white" | "gray" | "dark";

export function CampaignColorBrowser({
  liveFamilies, palettes, initialPaletteId, onSavePalette,
}: {
  liveFamilies: PrimitiveColorFamily[];
  palettes: BrowserPalette[];
  initialPaletteId?: string | null;
  onSavePalette: (name: string, colors: string[]) => void;
}) {
  const [bg, setBg] = useState<Bg>("white");
  const [search, setSearch] = useState("");
  const [hue, setHue] = useState<string>("all");
  const [bandFilter, setBandFilter] = useState<string>("all");

  // Working palette + which existing palette is loaded (for highlight)
  const [activePaletteId, setActivePaletteId] = useState<string | null>(initialPaletteId ?? null);
  const selected = palettes.find((p) => p.id === activePaletteId) ?? null;
  const [name, setName] = useState(selected ? `${selected.name} (custom)` : "New palette");
  const [colors, setColors] = useState<string[]>(selected ? selected.colors : []);

  const loadPalette = (id: string | null) => {
    setActivePaletteId(id);
    const pal = palettes.find((p) => p.id === id) ?? null;
    if (pal) { setColors(pal.colors); setName(`${pal.name} (custom)`); }
    else { setColors([]); setName("New palette"); }
  };

  const [customHex, setCustomHex] = useState("");
  const norm = normaliseHex(customHex);
  const addColor    = (hex: string) => setColors((p) => (p.includes(hex) ? p : [...p, hex]));
  const removeColor = (hex: string) => setColors((p) => p.filter((c) => c !== hex));

  // Order + filter families
  const families = useMemo(() => {
    const byId: Record<string, PrimitiveColorFamily> = {};
    liveFamilies.forEach((f) => { byId[f.family] = f; });
    return FAMILY_ORDER.map((id) => byId[id]).filter(Boolean) as PrimitiveColorFamily[];
  }, [liveFamilies]);

  const shownFamilies = hue === "all" ? families : families.filter((f) => f.family === hue);
  const shownBands = bandFilter === "all" ? BANDS : BANDS.filter((b) => b.label === bandFilter);
  const q = search.trim().toLowerCase();

  const totalColors = families.reduce((n, f) => n + f.tokens.filter((t) => typeof t.step === "number").length, 0);

  const tokenFor = (fam: PrimitiveColorFamily, step: number) => fam.tokens.find((t) => t.step === step);
  const matchesSearch = (shortName: string, hex: string) =>
    !q || shortName.toLowerCase().includes(q) || hex.toLowerCase().includes(q);

  return (
    <div className={styles.cb}>
      {/* Toolbar */}
      <div className={styles.cbToolbar}>
        <div className={styles.cbSearch}>
          <TextField label="Search colors" size="small" leadingIcon={<Search style={{ width: 14, height: 14 }} />}
            value={search} onChange={(e) => setSearch(e.target.value)} inputProps={{ placeholder: "name or hex, e.g. blue-100" }} />
        </div>
        <SegmentedControl
          aria-label="Preview background"
          value={bg}
          onChange={(v) => setBg(v as Bg)}
          items={[
            { value: "white", label: "White" },
            { value: "gray", label: "Gray" },
            { value: "dark", label: "Dark" },
          ]}
        />
        <span className={styles.cbCounts}>{totalColors} colors · {families.length} hues</span>
      </div>

      {/* Hue dots */}
      <div className={styles.cbHues}>
        <FilterChip selected={hue === "all"} onClick={() => setHue("all")}>All hues</FilterChip>
        {families.map((f) => {
          const anchor = tokenFor(f, 100) ?? f.tokens[Math.floor(f.tokens.length / 2)];
          return (
            <button key={f.family} type="button" title={f.label}
              className={`${styles.cbHueDot} ${hue === f.family ? styles.cbHueActive : ""}`}
              style={{ background: anchor?.hex }} onClick={() => setHue(hue === f.family ? "all" : f.family)} />
          );
        })}
      </div>

      {/* Lightness filter chips */}
      <div className={styles.cbFilters}>
        <span className={styles.cbFilterLabel}>Lightness</span>
        <FilterChip selected={bandFilter === "all"} onClick={() => setBandFilter("all")}>All</FilterChip>
        {BANDS.map((b) => (
          <FilterChip key={b.label} selected={bandFilter === b.label}
            onClick={() => setBandFilter(bandFilter === b.label ? "all" : b.label)}>{b.label}</FilterChip>
        ))}
      </div>

      {/* Body: matrix + palettes panel */}
      <div className={styles.cbBody}>
        <div className={`${styles.cbMatrix} ${styles[`cbMatrix--${bg}`]}`}>
          {/* Column headers */}
          <div className={styles.cbHeaderRow}>
            <div className={styles.cbBandCol} />
            {shownFamilies.map((f) => (
              <div key={f.family} className={styles.cbColLabel}>{f.label}</div>
            ))}
          </div>

          {shownBands.map((band) => (
            <div key={band.label} className={styles.cbBand}>
              {band.steps.map((step, si) => (
                <div key={step} className={styles.cbRow}>
                  <div className={styles.cbBandCol}>
                    {si === 0 && <span className={styles.cbBandLabel}>{band.label}</span>}
                  </div>
                  {shownFamilies.map((f) => {
                    const tok = tokenFor(f, step);
                    if (!tok || !matchesSearch(tok.shortName, tok.hex)) {
                      return <div key={f.family} className={styles.cbCellEmpty} />;
                    }
                    const active = colors.includes(tok.hex);
                    return (
                      <button key={f.family} type="button"
                        className={`${styles.cbCell} ${active ? styles.cbCellActive : ""}`}
                        style={{ background: tok.hex }} title={`${tok.shortName} · ${tok.hex}`}
                        onClick={() => addColor(tok.hex)} aria-label={`Add ${tok.shortName}`}>
                        <span className={styles.cbCellName} style={{ color: textOn(tok.hex) }}>{tok.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Palettes panel */}
        <aside className={styles.cbPalettes}>
          <div className={styles.cbPalettesHead}>
            <span className={styles.cbPalettesTitle}>Palettes</span>
            <Button variant="secondary" size="small" leading={<Plus style={{ width: 14, height: 14 }} />}
              onClick={() => loadPalette(null)}>New</Button>
          </div>

          {/* Working palette editor */}
          <div className={styles.cbWorking}>
            <TextField label="Palette name" size="small" value={name} onChange={(e) => setName(e.target.value)} />
            <div className={styles.cbWorkingChips}>
              {colors.length === 0 && <span className={styles.cbWorkingEmpty}>Click colours in the grid to add them.</span>}
              {colors.map((hex) => (
                <button key={hex} type="button" className={styles.cbWorkingChip} style={{ background: hex }}
                  onClick={() => removeColor(hex)} title={`${hex} — remove`} aria-label={`Remove ${hex}`}>
                  <span style={{ color: textOn(hex) }}>×</span>
                </button>
              ))}
            </div>
            <div className={styles.cbWorkingActions}>
              <TextField label="Custom hex" size="small" value={customHex}
                onChange={(e) => setCustomHex(e.target.value)}
                inputProps={{ placeholder: "#rrggbb", spellCheck: false,
                  onKeyDown: (e) => { if (e.key === "Enter" && norm) { addColor(norm); setCustomHex(""); } } }} />
              <Button variant="tertiary" size="small" disabled={!norm}
                onClick={() => { if (norm) { addColor(norm); setCustomHex(""); } }}>Add</Button>
            </div>
            <Button variant="primary" size="small" isFullWidth disabled={!name.trim() || colors.length === 0}
              onClick={() => onSavePalette(name.trim(), colors)}>Save palette</Button>
          </div>

          {/* Existing palettes */}
          <div className={styles.cbPaletteList}>
            {palettes.map((p) => (
              <button key={p.id} type="button"
                className={`${styles.cbPaletteCard} ${activePaletteId === p.id ? styles.cbPaletteCardActive : ""}`}
                onClick={() => loadPalette(p.id)}>
                <span className={styles.cbPaletteName}>{p.name}</span>
                <span className={styles.cbPaletteCount}>{p.colors.length} colors</span>
                <div className={styles.cbPaletteSwatches}>
                  {p.colors.slice(0, 10).map((c, i) => (
                    <div key={i} className={styles.cbPaletteSwatch} style={{ background: c }} />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

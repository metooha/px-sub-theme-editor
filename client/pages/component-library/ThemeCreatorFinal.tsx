/**
 * Theme Creator — palettes and themes are the same concept.
 * A palette becomes a theme when saved / customised.
 * v-final — single canonical file
 */
import React, { useState, useCallback, useEffect, useRef, useMemo } from "react";
import styles from "./ColorBrowser.module.css";
import { ChevronDown, ChevronUp, Search, Plus, Trash, X } from "@/components/icons";
import {
  PRIMITIVE_COLOR_FAMILIES,
  ALL_PRIMITIVE_TOKENS,
  type PrimitiveColorToken,
  type PrimitiveColorFamily,
  parsePrimitiveVar,
  resolveHexFromPrimitiveVar,
} from "../../components/theme-editor/primitiveColorTokens";
import { PrimitivePicker } from "../../components/theme-editor/PrimitivePicker";
import { Button } from "@/components/ui/Button";
import { TextField } from "@/components/ui/TextField";
import { Badge } from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import {
  Modal, ModalContent, ModalHeader, ModalTitle, ModalFooter,
} from "@/components/ui/Modal";
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/Tab";
import { CampaignColorBrowser, type BrowserPalette } from "./CampaignColorBrowser";

// ─────────────────────────────────────────────────────────────────────────────
// Color math
// ─────────────────────────────────────────────────────────────────────────────

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

function textOnColor(hex: string): string {
  if (!hex || hex.length > 7) return "#1a1a1a";
  return luminance(hex) > 0.179 ? "#1a1a1a" : "#ffffff";
}

function varToHex(v: string): string {
  if (!v) return "#cccccc";
  return v.startsWith("var(") ? (resolveHexFromPrimitiveVar(v) ?? "#cccccc") : v;
}

function hexToPrimitiveName(hex: string): string {
  return ALL_PRIMITIVE_TOKENS.find((t) => t.hex.toLowerCase() === hex.toLowerCase())?.shortName ?? hex;
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const { r, g, b } = hexToRgb(hex);
  const [rn, gn, bn] = [r / 255, g / 255, b / 255];
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: l * 100 };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1))).toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function normaliseHex(raw: string): string | null {
  const s = raw.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{6}$/.test(s)) return `#${s.toLowerCase()}`;
  if (/^[0-9a-fA-F]{3}$/.test(s)) return `#${s.split("").map((c) => c + c).join("").toLowerCase()}`;
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// Scale generation
// ─────────────────────────────────────────────────────────────────────────────

const STEP_L: Record<number, number> = {
  5:97,10:95,20:89,30:83,40:77,50:71,60:65,70:59,80:53,
  90:47,100:41,110:36,120:31,130:27,140:23,150:19,160:15,170:11,180:7,
};
const STEP_S: Record<number, number> = {
  5:.12,10:.20,20:.35,30:.52,40:.65,50:.77,60:.87,
  70:.94,80:.98,90:1,100:1,110:.98,120:.96,
  130:.93,140:.90,150:.87,160:.84,170:.80,180:.76,
};
const GEN_STEPS = [5,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170,180];
const SCALE_FAMILIES = ["blue","cyan","gray","green","orange","pink","purple","red","spark","teal","yellow"];

// ─────────────────────────────────────────────────────────────────────────────
// Live primitive resolver — reads CSS variables from DOM so swatches update
// when the active theme changes (each theme loads its own primitive.css)
// ─────────────────────────────────────────────────────────────────────────────

function readHexFromDOM(cssVarName: string): string | null {
  if (typeof document === "undefined") return null;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(cssVarName).trim();
  if (!raw) return null;
  // CSS gives back e.g. " #0053e2" or "rgb(0,83,226)"
  if (raw.startsWith("#")) return raw;
  const rgb = raw.match(/rgb\(\s*(\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) {
    const [,r,g,b] = rgb;
    return `#${[r,g,b].map((n)=>parseInt(n).toString(16).padStart(2,"0")).join("")}`;
  }
  return null;
}

/** Parse a primitive CSS file text → { "--ld-primitive-color-*": "#hex" } */
function parsePrimitiveCSS(cssText: string): Record<string, string> {
  const out: Record<string, string> = {};
  const re = /--(ld-primitive-color-[a-z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\([^)]+\))/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(cssText)) !== null) {
    out[`--${m[1]}`] = m[2].trim();
  }
  return out;
}

/** Merge override map into PRIMITIVE_COLOR_FAMILIES */
function applyOverrides(overrides: Record<string, string>): PrimitiveColorFamily[] {
  return PRIMITIVE_COLOR_FAMILIES.map((fam) => ({
    ...fam,
    tokens: fam.tokens.map((tok) => {
      const v = overrides[tok.name];
      return v ? { ...tok, hex: v } : tok;
    }),
  }));
}

import { AVAILABLE_THEMES } from "@/contexts/ThemeRegistry";

/**
 * Given a brand/theme ID from the Theme Creator sidebar, returns primitive color
 * families with hex values from that brand's primitive CSS file.
 * Only Sam's Club and Walmart B2B have custom primitive CSS; others use base values.
 */
function useBrandPrimitiveFamilies(brandId: string): PrimitiveColorFamily[] {
  const [families, setFamilies] = useState<PrimitiveColorFamily[]>(PRIMITIVE_COLOR_FAMILIES);

  useEffect(() => {
    const themeData = AVAILABLE_THEMES.find((t) => t.id === brandId);
    const primitiveCSS = themeData?.primitiveCSS;

    if (!primitiveCSS || primitiveCSS === "/styles/themes/base/primitive.css") {
      setFamilies(PRIMITIVE_COLOR_FAMILIES);
      return;
    }

    // Cache-bust so stale CSS doesn't hide overrides
    fetch(`${primitiveCSS}?v=${Date.now()}`)
      .then((r) => r.text())
      .then((text) => {
        const overrides = parsePrimitiveCSS(text);
        setFamilies(applyOverrides(overrides));
      })
      .catch(() => setFamilies(PRIMITIVE_COLOR_FAMILIES));
  }, [brandId]);

  return families;
}

function generateColorScale(baseHex: string, familyId: string): PrimitiveColorToken[] {
  const { h, s } = hexToHsl(baseHex);
  return GEN_STEPS.map((step) => ({
    name: `--custom-${familyId}-${step}`,
    shortName: `${familyId}-${step}`,
    family: familyId, step,
    hex: hslToHex(h, Math.min(s * STEP_S[step], 100), STEP_L[step]),
  }));
}

// Recolor a family's scale toward a seed colour by shifting the whole ramp by the
// hue delta (and saturation ratio) between the seed and the family's anchor step.
// This preserves the natural per-step variation of the base ramp, so a seed that
// equals the base anchor reproduces the base ramp exactly (no distortion).
function recolorFamily(family: PrimitiveColorFamily, hex: string): PrimitiveColorFamily {
  const anchorTok = family.tokens.find((t) => t.step === 100) ?? family.tokens[Math.floor(family.tokens.length / 2)];
  if (!anchorTok) return family;
  const a = hexToHsl(anchorTok.hex);
  const s = hexToHsl(hex);
  const dh = s.h - a.h;
  const satRatio = a.s > 1 ? s.s / a.s : 1;
  return {
    ...family,
    tokens: family.tokens.map((tok) => {
      const c = hexToHsl(tok.hex);
      const nh = ((c.h + dh) % 360 + 360) % 360;
      const ns = Math.max(0, Math.min(100, c.s * satRatio));
      return { ...tok, hex: hslToHex(nh, ns, c.l) };
    }),
  };
}

function familyAnchorHue(family: PrimitiveColorFamily): number {
  const anchor = family.tokens.find((t) => t.step === 100) ?? family.tokens[Math.floor(family.tokens.length / 2)];
  return anchor ? hexToHsl(anchor.hex).h : 0;
}

// Pick the chromatic family whose base hue is closest to a seed colour.
function nearestChromaticFamily(hex: string, families: PrimitiveColorFamily[]): string | null {
  const { s, h } = hexToHsl(hex);
  if (s < 8) return "gray"; // achromatic seeds map to the gray family
  let best: string | null = null, bestD = Infinity;
  for (const fam of families) {
    if (!SCALE_FAMILIES.includes(fam.family) || fam.family === "gray") continue;
    let d = Math.abs(familyAnchorHue(fam) - h); d = Math.min(d, 360 - d);
    if (d < bestD) { bestD = d; best = fam.family; }
  }
  return best;
}

// Apply a theme's seed colours onto the matching primitive families so the
// Palette Reference visibly follows the seeds. A seed equal to its base value
// recolours to the same hue (no visible change), preserving the inheritance model.
function applySeedsToFamilies(
  families: PrimitiveColorFamily[],
  seeds?: { primary: string; secondary: string; neutral: string; positive: string; negative: string; warning: string },
): PrimitiveColorFamily[] {
  if (!seeds) return families;
  const map: Record<string, string> = {};
  const assign = (famId: string | null, hex: string) => { if (famId && hex && !map[famId]) map[famId] = hex; };
  // Brand seeds take priority on hue collisions.
  assign(nearestChromaticFamily(seeds.primary, families), seeds.primary);
  assign(nearestChromaticFamily(seeds.secondary, families), seeds.secondary);
  // Fixed semantic roles.
  assign("gray", seeds.neutral);
  assign("green", seeds.positive);
  assign("red", seeds.negative);
  assign("spark", seeds.warning);
  return families.map((fam) => (map[fam.family] ? recolorFamily(fam, map[fam.family]) : fam));
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type SeedKey = "primary"|"secondary"|"neutral"|"positive"|"negative"|"warning";

interface ThemeSeeds {
  primary:string; secondary:string; neutral:string;
  positive:string; negative:string; warning:string;
}

interface Theme {
  id:string; name:string; description?:string;
  type:"brand"|"campaign"|"custom";
  seeds?:ThemeSeeds;
  colors:string[];
  isDefault:boolean;
}

interface CustomScale {
  id:string; name:string; baseHex:string; tokens:PrimitiveColorToken[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

function brandTheme(
  id:string, name:string, desc:string,
  primary:string, secondary:string,
  overrides?: Partial<ThemeSeeds>
):Theme {
  const seeds:ThemeSeeds = {
    primary, secondary,
    neutral:  "#74767c",  // gray-100
    positive: "#2a8703",  // green-100 (LD base)
    negative: "#ea1100",  // red-100 (LD base)
    warning:  "#ffc220",  // spark-100 (LD base)
    ...overrides,
  };
  const ph = (v:string) => v.startsWith("var(") ? varToHex(v) : v;
  return { id,name,description:desc,type:"brand",seeds,isDefault:true,
    colors:[ph(primary),ph(secondary),seeds.neutral,seeds.positive,seeds.negative,seeds.warning] };
}

// Core brand identities
const BRAND_THEMES:Theme[] = [
  brandTheme("walmart","Walmart","Walmart's primary brand identity",
    "#0053e2", "#ffc220"),
  brandTheme("sams-club","Sam's Club","Sam's Club brand identity",
    "#0062ad", "#0086ed",
    { negative: "#df2c2c", neutral: "#74767c" }),
  // Cashi only overrides the primary action semantic to purple-100, which it does
  // not redefine as a primitive — so it inherits base purple-100 (#63327e).
  brandTheme("cashi-mx","Cashi MX","Cashi fintech — Mexico",
    "#63327e", "#0086ed",
    { positive: "#2a8703", warning: "#ffc220" }),
  // Bodega is a semantic-only theme: it remaps the brand color to green-100 but
  // ships no primitive overrides, so the live app resolves brand/positive green to
  // the base green-100 (#2a8703) and negative red to base red-100 (#ea1100).
  brandTheme("bodega","Bodega","Bodega Walmart México",
    "#2a8703", "#fa6400",
    { positive: "#2a8703", negative: "#ea1100", warning: "#ffc220" }),
];

// Brand overrides — Walmart base with different semantic / primitive layers
const OVERRIDE_THEMES:Theme[] = [
  brandTheme("walmart-b2b","Walmart Business","B2B platform — navy blue",
    "#002e99", "#ffc220"),
  // Legacy references blue-100 for its brand color but ships no primitive override,
  // so it inherits base blue-100 (#0053e2).
  brandTheme("walmart-legacy","Walmart Legacy","Classic Walmart blue with Bogle font",
    "#0053e2", "#ffc220"),
  brandTheme("walmart-plus","Walmart W+","Walmart Plus membership",
    "#0053e2", "#fff200",
    { warning: "#ffc220" }),
  brandTheme("sparky","Sparky","Internal tools — dark navy and cyan",
    "#001e60", "#00a9c6",
    { positive: "#2a8703", warning: "#ffc220" }),
  // Data Ventures references purple-100 for its brand color but ships no primitive
  // override, so it inherits base purple-100 (#63327e).
  brandTheme("data-ventures","Data Ventures","Data analytics platform",
    "#63327e", "#0053e2",
    { positive: "#2a8703", warning: "#ffc220" }),
  brandTheme("members-mark","Member's Mark","Sam's Club private label",
    "#283645", "#0062ad",
    { neutral: "#5a6672", positive: "#2a8703" }),
];

const DEFAULT_THEMES:Theme[] = [...BRAND_THEMES, ...OVERRIDE_THEMES];

const CAMPAIGN_THEMES:Theme[] = [
  { id:"fy27",name:"FY27 Summer Savings",type:"campaign",isDefault:true,
    colors:["#f0f5ff","#c9dcfd","#90b5f9","#2e70eb","#0053e2","#fff3d2","#ffd463","#ffc220","#e6a31d","#cc851a"] },
  { id:"fy26",name:"FY26 New Year New You",type:"campaign",isDefault:true,
    colors:["#f0f5ff","#0053e2","#001270","#080042","#f4f9f2","#2a8703","#154402","#081b01","#fef2f1","#ea1100"] },
  { id:"brand-primary",name:"Brand Primary",type:"campaign",isDefault:true,
    colors:["#e9f1fe","#0053e2","#003fb2","#002185","#001270"] },
  { id:"campaign-baby",name:"Campaign: Baby",type:"campaign",isDefault:true,
    colors:["#fce9f5","#f0adcc","#d95fa7","#b62781"] },
  { id:"campaign-beauty",name:"Campaign: Beauty",type:"campaign",isDefault:true,
    colors:["#fef6fb","#ea9ac3","#cb2c90","#8c1e64","#2e0a21"] },
  { id:"campaign-patio",name:"Campaign: Patio",type:"campaign",isDefault:true,
    colors:["#f4f9f2","#aacf9a","#2a8703","#0d2901"] },
  { id:"campaign-wellness",name:"Campaign: Wellness",type:"campaign",isDefault:true,
    colors:["#e9f1fe","#2e70eb","#0053e2","#003fb2","#002185"] },
  { id:"campaign-pet",name:"Campaign: Pet",type:"campaign",isDefault:true,
    colors:["#f0f9fb","#00a9c6","#00809e"] },
  { id:"campaign-spring",name:"Campaign: Spring",type:"campaign",isDefault:true,
    colors:["#f7f5f9","#c1adcb","#73478b","#3b1e4c"] },
];

const ALL_DEFAULT:Theme[] = [...BRAND_THEMES,...OVERRIDE_THEMES,...CAMPAIGN_THEMES];

const SEED_LABELS:Record<SeedKey,{label:string;description:string}> = {
  primary:{label:"Primary",description:"Buttons, links, focus rings"},
  secondary:{label:"Secondary",description:"Accent highlights, CTAs"},
  neutral:{label:"Neutral",description:"Borders, text, surfaces"},
  positive:{label:"Positive",description:"Success, confirmations"},
  negative:{label:"Negative",description:"Errors, destructive actions"},
  warning:{label:"Warning",description:"Caution, alerts"},
};
const SEED_KEYS:SeedKey[] = ["primary","secondary","neutral","positive","negative","warning"];
const PREFERRED:Record<SeedKey,string[]> = {
  primary:["blue","magic","cyan","purple","teal","green"],
  secondary:["spark","orange","red","cyan","pink"],
  neutral:["gray"],positive:["green","teal"],negative:["red"],warning:["spark","yellow","orange"],
};

const STORAGE_KEY = "theme-creator-v3";
const SCALES_KEY  = "theme-creator-scales-v3";

// ─────────────────────────────────────────────────────────────────────────────
// Collapsible section wrapper
// ─────────────────────────────────────────────────────────────────────────────

function CollapsibleSection({ title, subtitle, defaultOpen=true, className="", children }: {
  title:string; subtitle?:string; defaultOpen?:boolean; className?:string; children:React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={`${styles.collapsibleSection} ${className}`}>
      <button type="button" className={styles.collapsibleHeader} onClick={() => setOpen((v) => !v)}>
        <div className={styles.collapsibleHeaderText}>
          <h3 className={styles.sectionTitle}>{title}</h3>
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </div>
        {open ? <ChevronUp width={16} height={16} className={styles.chevronIcon} /> : <ChevronDown width={16} height={16} className={styles.chevronIcon} />}
      </button>
      {open && <div className={styles.collapsibleBody}>{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scale swatch
// ─────────────────────────────────────────────────────────────────────────────

function ScaleSwatch({ token, onCopy, small=false }: {
  token:PrimitiveColorToken; onCopy:(hex:string)=>void; small?:boolean;
}) {
  const [hov,setHov] = useState(false);
  const fg = textOnColor(token.hex.slice(0,7));
  return (
    <button type="button"
      className={small ? styles.scaleSwatchSmall : styles.scaleSwatch}
      style={{ background: token.hex }}
      onClick={() => onCopy(token.hex)}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      title={`${token.shortName} — ${token.hex}`}
    >
      {hov && !small && (
        <span className={styles.swatchTooltip} style={{ color:fg }}>
          <span className={styles.swatchStep}>{token.step}</span>
          <span className={styles.swatchHex}>{token.hex}</span>
        </span>
      )}
      {hov && small && <span className={styles.swatchTooltipSmall} style={{ color:fg }}>{token.step}</span>}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Add Scale Modal
// ─────────────────────────────────────────────────────────────────────────────

const BROWSEABLE_FAMILIES = PRIMITIVE_COLOR_FAMILIES.filter(
  (f) => SCALE_FAMILIES.includes(f.family)
);

function AddScaleModal({ open, onClose, onAdd, existingNames }: {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string, hex: string) => void;
  existingNames: string[];
}) {
  const [tab, setTab]     = useState<"browse"|"custom">("browse");
  const [query, setQuery] = useState("");
  const [hex, setHex]     = useState("");
  const [name, setName]   = useState("");
  const hexRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const norm    = normaliseHex(hex);
  const preview = norm ? generateColorScale(norm, "preview") : null;

  // Filter families by search query
  const filtered = BROWSEABLE_FAMILIES.filter(
    (f) => f.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) { setQuery(""); setHex(""); setName(""); setTab("browse"); return; }
    setTimeout(() => searchRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (tab === "custom") setTimeout(() => hexRef.current?.focus(), 50);
  }, [tab]);

  const handleAddFamily = (fam: typeof PRIMITIVE_COLOR_FAMILIES[0]) => {
    // Add the family using its representative mid-tone as the base hex
    const midTok = fam.tokens.find((t) => t.step === 100) ?? fam.tokens[Math.floor(fam.tokens.length / 2)];
    onAdd(fam.label, midTok.hex);
    onClose();
  };

  const handleAddCustom = () => {
    if (!norm) return;
    onAdd(name.trim() || `Custom ${Date.now().toString().slice(-4)}`, norm);
    onClose();
  };

  return (
    <Modal open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <ModalContent size="medium" maxWidth="560px">
        <ModalHeader>
          <ModalTitle>Add Color Scale</ModalTitle>
        </ModalHeader>

        <Tabs value={tab} onValueChange={(v) => setTab(v as "browse" | "custom")}>
          <TabList>
            <Tab value="browse">Browse existing</Tab>
            <Tab value="custom">Create custom</Tab>
          </TabList>

          <TabPanel value="browse">
            <div className={styles.modalBody}>
              <TextField
                label="Search scales"
                size="small"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search color scales…"
                leadingIcon={<Search style={{ width: 18, height: 18 }} />}
              />
              <div className={styles.modalFamilyGrid}>
                {filtered.length === 0 && (
                  <p className={styles.modalEmpty}>No scales match "{query}"</p>
                )}
                {filtered.map((fam) => {
                  const alreadyAdded = existingNames.includes(fam.label);
                  const rep5 = fam.tokens.filter((t) => typeof t.step === "number").slice(0, 5);
                  return (
                    <button
                      key={fam.family}
                      type="button"
                      className={`${styles.modalFamilyCard} ${alreadyAdded ? styles.modalFamilyCardAdded : ""}`}
                      onClick={() => !alreadyAdded && handleAddFamily(fam)}
                      disabled={alreadyAdded}
                      title={alreadyAdded ? `${fam.label} is already in the palette` : `Add ${fam.label} scale`}
                    >
                      <div className={styles.modalFamilySwatches}>
                        {rep5.map((t) => (
                          <div key={t.name} className={styles.modalFamilySwatch} style={{ background: t.hex }} />
                        ))}
                      </div>
                      <div className={styles.modalFamilyRow}>
                        <span className={styles.modalFamilyName}>{fam.label}</span>
                        {alreadyAdded && <Badge variant="neutral" size="small">Added</Badge>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </TabPanel>

          <TabPanel value="custom">
            <div className={styles.modalBody}>
              <p className={styles.modalHint}>Enter a hex value and we’ll generate a full 19-step scale.</p>
              <div className={styles.modalCustomForm}>
                <div className={styles.modalHexRow}>
                  {norm && <div className={styles.modalHexSwatch} style={{ background: norm }} />}
                  <TextField
                    label="Hex color"
                    size="small"
                    value={hex}
                    onChange={(e) => setHex(e.target.value)}
                    placeholder="#0053e2"
                    error={hex && !norm ? "Invalid hex" : undefined}
                    UNSAFE_style={{ width: 150 }}
                    inputProps={{ onKeyDown: (e) => { if (e.key === "Enter") handleAddCustom(); } }}
                  />
                </div>
                <TextField
                  label="Scale name"
                  size="small"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Brand Blue"
                  UNSAFE_style={{ width: 220 }}
                  inputProps={{ onKeyDown: (e) => { if (e.key === "Enter") handleAddCustom(); } }}
                />
              </div>

              {/* Live scale preview */}
              {preview && (
                <div className={styles.modalPreviewWrap}>
                  <span className={styles.modalLabel}>Preview</span>
                  <div className={styles.modalPreviewScale}>
                    {preview.map((t) => (
                      <div
                        key={t.name}
                        className={styles.modalPreviewCell}
                        style={{ background: t.hex }}
                        title={`${t.step} — ${t.hex}`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabPanel>
        </Tabs>

        <ModalFooter>
          <Button variant="tertiary" size="small" onClick={onClose}>Cancel</Button>
          {tab === "custom" && (
            <Button variant="primary" size="small" disabled={!norm} onClick={handleAddCustom}>
              Add scale
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Add Scale row (button that opens modal)
// ─────────────────────────────────────────────────────────────────────────────

function AddScaleRow({ onAdd, existingNames }: { onAdd:(name:string,hex:string)=>void; existingNames:string[] }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className={styles.addScaleRow} onClick={() => setModalOpen(true)}>
        <div className={`${styles.familyLabelCol} ${styles.addScaleLabel}`}>
          <span className={styles.addScaleHint}>+ Add scale</span>
        </div>
        {GEN_STEPS.map((step) => (
          <div key={step} className={styles.stepCell}>
            <div className={styles.addScaleDash} />
          </div>
        ))}
        <div className={styles.rowEditCol} />
      </div>
      <AddScaleModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={onAdd}
        existingNames={existingNames}
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EditableFamilyRow — a primitive scale row that can be overridden by hex
// ─────────────────────────────────────────────────────────────────────────────

function EditableFamilyRow({ family, customScale, onCopy, onSave, onReset }: {
  family: typeof PRIMITIVE_COLOR_FAMILIES[0];
  customScale: CustomScale | undefined;
  onCopy: (hex:string) => void;
  onSave: (name:string, hex:string) => void;
  onReset: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [hex, setHex] = useState("");
  const [draft, setDraft] = useState(""); // hex typed during editing, not yet saved
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const norm = normaliseHex(hex);
  // Live preview tokens while user is typing
  const previewTokens: PrimitiveColorToken[] | null =
    norm ? generateColorScale(norm, family.family) : null;

  // Tokens to display: live preview > saved override > primitive defaults
  const activeTokens: PrimitiveColorToken[] =
    (editing && previewTokens) ? previewTokens
    : customScale ? customScale.tokens
    : family.tokens;

  // Build step-aligned map. For families with non-standard steps (e.g. magic 1-4),
  // no GEN_STEPS key will match so we fall back to sequential display.
  const byStep: Record<number, PrimitiveColorToken> = {};
  activeTokens.forEach((t) => { if (typeof t.step === "number") byStep[t.step] = t; });
  const usesGenSteps = GEN_STEPS.some((s) => byStep[s]);
  // Ordered list for non-standard families
  const orderedTokens = usesGenSteps ? [] : activeTokens.filter((t) => typeof t.step === "number" || t.step === "base");

  const startEditing = () => {
    setHex(customScale?.baseHex ?? "");
    setDraft("");
    setEditing(true);
  };

  const doSave = () => {
    if (!norm) return;
    onSave(family.label, norm);
    setEditing(false); setHex("");
  };

  const doCancel = () => { setEditing(false); setHex(""); };
  const doReset  = () => { onReset(); setEditing(false); setHex(""); };

  const isOverridden   = !!customScale;
  const hasLivePreview = !!norm && editing;

  return (
    <div className={`${styles.familyRow} ${isOverridden ? styles.customFamilyRow : ""} ${hasLivePreview ? styles.familyRowPreview : ""}`}>
      {/* Label col — static, no double-click */}
      <div className={styles.familyLabelCol}>
        <span className={styles.familyName}>{family.label}</span>
        {isOverridden && (
          <div className={styles.overrideBadge}>
            <div className={styles.customScaleBaseSwatch} style={{ background: customScale!.baseHex }} />
            <span className={styles.overrideLabel}>Custom</span>
          </div>
        )}
      </div>

      {/* Scale swatches — step-aligned for standard families, sequential for non-standard */}
      {GEN_STEPS.map((step, i) => {
        const token = byStep[step] ?? (!usesGenSteps ? orderedTokens[i] : undefined);
        return (
          <div key={step} className={styles.stepCell}>
            {token
              ? <ScaleSwatch token={token} onCopy={editing ? ()=>{} : onCopy} />
              : <div className={styles.stepCellEmpty} />}
          </div>
        );
      })}

      {/* Edit button / inline editor — at the end of the row */}
      <div className={styles.rowEditCol}>
        {editing ? (
          <div className={styles.rowEditPanel}>
            <input ref={inputRef}
              className={`${styles.addScaleHexInput} ${hex && !norm ? styles.addScaleHexInvalid : ""}`}
              value={hex} onChange={(e) => setHex(e.target.value)}
              onKeyDown={(e) => { if (e.key==="Enter") doSave(); if (e.key==="Escape") doCancel(); }}
              placeholder="#hex" spellCheck={false} style={{ width:72 }} />
            <Button variant="primary" size="small" disabled={!norm} onClick={doSave}>Save</Button>
            {isOverridden && <Button variant="tertiary" size="small" onClick={doReset}>Reset</Button>}
            <Button variant="tertiary" size="small" onClick={doCancel} aria-label="Cancel">×</Button>
          </div>
        ) : (
          <Button variant="tertiary" size="small" onClick={startEditing}>Edit</Button>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SpecialEditableCard — card view for non-standard families with double-click edit
// ─────────────────────────────────────────────────────────────────────────────

function SpecialEditableCard({ family, onCopy, onSave, labelOnly = false }: {
  family: typeof PRIMITIVE_COLOR_FAMILIES[0];
  onCopy: (hex: string) => void;
  onSave: (name: string, hex: string) => void;
  labelOnly?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [hex, setHex] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const norm = normaliseHex(hex);

  useEffect(() => { if (editing) inputRef.current?.focus(); }, [editing]);

  const editControls = editing ? (
    <div className={styles.specialEditRow}>
      <input ref={inputRef}
        className={`${styles.addScaleHexInput} ${hex && !norm ? styles.addScaleHexInvalid : ""}`}
        value={hex} onChange={(e) => setHex(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && norm) { onSave(family.label, norm); setEditing(false); setHex(""); }
          if (e.key === "Escape") { setEditing(false); setHex(""); }
        }}
        placeholder="#hex" spellCheck={false} />
      <button type="button" className={styles.addScaleConfirm} disabled={!norm}
        onClick={() => { if (norm) { onSave(family.label, norm); setEditing(false); setHex(""); } }}>
        Apply
      </button>
      <button type="button" className={styles.addScaleCancel} onClick={() => { setEditing(false); setHex(""); }}>×</button>
    </div>
  ) : (
    <div className={styles.specialCardTitleRow}
      onDoubleClick={() => setEditing(true)}
      title="Double-click to override with a generated scale">
      <span className={styles.specialCardTitle}>{family.label}</span>
      <span className={styles.familyEditTooltip}>Edit scale</span>
    </div>
  );

  // labelOnly mode: just render the edit controls in a compact column (used inside familyLabelCol)
  if (labelOnly) {
    return <div className={styles.familyLabelClickable}>{editControls}</div>;
  }

  return (
    <div className={styles.specialCard}>
      {editControls}
      <div className={styles.specialSwatches}>
        {family.tokens.map((t) => <ScaleSwatch key={t.name} token={t} onCopy={onCopy} small />)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scale grid — all families integrated in one table
// ─────────────────────────────────────────────────────────────────────────────

// Cell background for transparent families so transparency is visible against blue
const TRANSPARENT_CELL_BG: Record<string, string> = {
  "transparent-light": "#002185",  // dark blue — white transparency visible against it
  "transparent-dark":  "#c9dcfd",  // light blue — dark transparency visible against it
};

// Families whose steps align with GEN_STEPS — show as step-aligned rows with colored bg
const ALIGNED_SPECIAL = ["transparent-dark", "transparent-light"];
// Magic — shown in main scale grid (editable, generates 19-step scale)
const MAGIC_FAMILIES = ["magic"];
// Read-only system families — shown as compact reference cards, not editable
const READONLY_CARDS = ["black", "white"];

function ScaleGrid({ onCopy, customScales, onAddScale, onDeleteScale, liveFamilies }: {
  onCopy:(hex:string)=>void;
  customScales:CustomScale[];
  onAddScale:(name:string,hex:string)=>void;
  onDeleteScale:(id:string)=>void;
  liveFamilies: PrimitiveColorFamily[];
}) {
  const mainFamilies    = liveFamilies.filter((f) => SCALE_FAMILIES.includes(f.family));
  const alignedSpecial  = liveFamilies.filter((f) => ALIGNED_SPECIAL.includes(f.family));

  const getOverride = (label: string) => customScales.find((s) => s.name === label);

  const handleFamilySave = (familyLabel: string, hex: string) => {
    const existing = customScales.find((s) => s.name === familyLabel);
    if (existing) onDeleteScale(existing.id);
    onAddScale(familyLabel, hex);
  };

  return (
    <div className={styles.scaleGrid}>
      {/* Column headers */}
      <div className={styles.scaleHeaderRow}>
        <div className={styles.familyLabelCol}><span className={styles.familyLabelHeader}>Family</span></div>
        {GEN_STEPS.map((s) => <div key={s} className={styles.stepHeader}>{s}</div>)}
        <div className={styles.rowEditCol} />
      </div>

      {/* Extra named custom scales */}
      {customScales.filter((s) => !PRIMITIVE_COLOR_FAMILIES.some((f) => f.label === s.name)).map((scale) => {
        const byStep:Record<number,PrimitiveColorToken>={};
        scale.tokens.forEach((t) => { if (typeof t.step==="number") byStep[t.step]=t; });
        return (
          <div key={scale.id} className={`${styles.familyRow} ${styles.customFamilyRow}`}>
            <div className={`${styles.familyLabelCol} ${styles.customFamilyLabelCol}`}>
              <span className={styles.familyName}>{scale.name}</span>
              <div className={styles.customScaleBaseSwatch} style={{ background:scale.baseHex }} title={scale.baseHex} />
              <button type="button" className={styles.customScaleDelete} onClick={() => onDeleteScale(scale.id)}>Remove</button>
            </div>
            {GEN_STEPS.map((step) => (
              <div key={step} className={styles.stepCell}>
                {byStep[step] ? <ScaleSwatch token={byStep[step]} onCopy={onCopy} /> : <div className={styles.stepCellEmpty} />}
              </div>
            ))}
            <div className={styles.rowEditCol} />
          </div>
        );
      })}

      {/* Inline add row */}
      <AddScaleRow
        onAdd={onAddScale}
        existingNames={[
          ...PRIMITIVE_COLOR_FAMILIES.map((f) => f.label),
          ...customScales.map((s) => s.name),
        ]}
      />

      {/* Main chromatic families — editable */}
      {mainFamilies.map((fam) => (
        <EditableFamilyRow key={fam.family} family={fam} customScale={getOverride(fam.label)}
          onCopy={onCopy} onSave={handleFamilySave}
          onReset={() => { const ex = getOverride(fam.label); if (ex) onDeleteScale(ex.id); }} />
      ))}

      {/* Aligned special families (transparent-dark, transparent-light) — as step-aligned rows */}
      {alignedSpecial.map((fam) => {
        const override = getOverride(fam.label);
        const cellBg = TRANSPARENT_CELL_BG[fam.family];
        const byStep: Record<number, PrimitiveColorToken> = {};
        const tokens = override ? override.tokens : fam.tokens;
        tokens.forEach((t) => { if (typeof t.step === "number") byStep[t.step] = t; });

        return (
          <div key={fam.family} className={`${styles.familyRow} ${override ? styles.customFamilyRow : ""}`}>
            <div className={styles.familyLabelCol}>
              {override ? (
                <div className={styles.customScaleLabelGroup}>
                  <span className={styles.familyName}>{fam.label}</span>
                  <div className={styles.customScaleBaseSwatch} style={{ background: override.baseHex }} />
                  <button type="button" className={styles.customScaleDelete} onClick={() => onDeleteScale(override.id)}>Reset</button>
                </div>
              ) : (
                <SpecialEditableCard family={fam} onCopy={onCopy} onSave={handleFamilySave} labelOnly />
              )}
            </div>
            {GEN_STEPS.map((step) => {
              const token = byStep[step];
              const isLight = fam.family === "transparent-light";
              const swatchBorder = isLight ? "1.5px solid rgba(255,255,255,0.3)" : "1.5px solid rgba(0,0,53,0.2)";
              const emptyBorder  = isLight ? "1px dashed rgba(255,255,255,0.15)" : "1px dashed rgba(0,0,53,0.12)";
              return (
                <div key={step} className={styles.stepCell} style={{ background: cellBg }}>
                  {token ? (
                    <button type="button"
                      className={styles.scaleSwatch}
                      style={{ background: token.hex, border: swatchBorder }}
                      onClick={() => onCopy(token.hex)}
                      title={`${token.shortName} — ${token.hex}`}
                    />
                  ) : (
                    <div className={styles.stepCellEmpty}
                      style={{ border: emptyBorder, borderRadius: 4, margin: 2 }} />
                  )}
                </div>
              );
            })}
            <div className={styles.rowEditCol} />
          </div>
        );
      })}

      {/* Magic — editable in main scale grid (like chromatic families) */}
      {liveFamilies.filter((f) => MAGIC_FAMILIES.includes(f.family)).map((fam) => (
        <EditableFamilyRow key={fam.family} family={fam} customScale={getOverride(fam.label)}
          onCopy={onCopy} onSave={handleFamilySave}
          onReset={() => { const ex=getOverride(fam.label); if(ex) onDeleteScale(ex.id); }} />
      ))}

      {/* System families — read-only rows (black, white) */}
      {liveFamilies.filter((f) => READONLY_CARDS.includes(f.family)).map((fam) => {
        const byStep: Record<number, PrimitiveColorToken> = {};
        fam.tokens.forEach((t) => { if (typeof t.step === "number") byStep[t.step] = t; });
        const usesGenSteps = GEN_STEPS.some((s) => byStep[s]);
        const ordered = usesGenSteps ? [] : fam.tokens;
        return (
          <div key={fam.family} className={`${styles.familyRow} ${styles.readonlyFamilyRow}`}>
            <div className={styles.familyLabelCol}>
              <div className={styles.readonlyLabelInner}>
                <span className={styles.familyName}>{fam.label}</span>
                <Badge variant="neutral" size="small">System</Badge>
              </div>
            </div>
            {GEN_STEPS.map((step, i) => {
              const token = byStep[step] ?? (!usesGenSteps ? ordered[i] : undefined);
              return (
                <div key={step} className={styles.stepCell}>
                  {token
                    ? <ScaleSwatch token={token} onCopy={onCopy} />
                    : <div className={styles.stepCellEmpty} />}
                </div>
              );
            })}
            <div className={styles.rowEditCol} />
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hex input (inline seed editor)
// ─────────────────────────────────────────────────────────────────────────────

function HexInput({ defaultValue, onConfirm, onCancel }: {
  defaultValue:string; onConfirm:(hex:string)=>void; onCancel:()=>void;
}) {
  const [value,setValue] = useState(defaultValue);
  const norm = normaliseHex(value);
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);
  return (
    <div className={styles.hexInputWrap} onClick={(e) => e.stopPropagation()}>
      <div className={styles.hexInputSwatch}
        style={{ background:norm??"#eee", border:norm?"1.5px solid rgba(0,0,0,0.1)":"1.5px dashed #ccc" }} />
      <input ref={ref} className={`${styles.hexInputField} ${norm?"":styles.hexInputInvalid}`}
        value={value} onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key==="Enter"&&norm) onConfirm(norm); if (e.key==="Escape") onCancel(); }}
        placeholder="#rrggbb" spellCheck={false} />
      <button type="button" className={styles.hexInputApply} disabled={!norm} onClick={() => norm&&onConfirm(norm)}>Apply</button>
      <button type="button" className={styles.hexInputCancel} onClick={onCancel}>×</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Seed editor
// ─────────────────────────────────────────────────────────────────────────────

function SeedEditor({ theme, onSeedChange, onDirectHex, isReadOnly }: {
  theme:Theme; onSeedChange:(key:SeedKey,value:string)=>void;
  onDirectHex:(key:SeedKey,hex:string)=>void; isReadOnly:boolean;
}) {
  const [openPicker,setOpenPicker] = useState<SeedKey|null>(null);
  const [pickerAnchor,setPickerAnchor] = useState<{top:number;left:number}|null>(null);
  const [hexInputKey,setHexInputKey] = useState<SeedKey|null>(null);
  const rowRefs = useRef<Partial<Record<SeedKey,HTMLDivElement>>>({});

  const handleOpenPicker = (key:SeedKey) => {
    if (isReadOnly) return;
    const el = rowRefs.current[key];
    if (el) { const r=el.getBoundingClientRect(); setPickerAnchor({top:r.bottom+4,left:r.left}); }
    setOpenPicker(key); setHexInputKey(null);
  };

  if (!theme.seeds) return null;

  return (
    <div className={styles.seedGrid}>
      {SEED_KEYS.map((key) => {
        const varValue = theme.seeds![key];
        const hex = varToHex(varValue);
        const primitiveName = varValue.startsWith("var(")
          ? (parsePrimitiveVar(varValue)?.replace("--ld-primitive-color-","")??hex)
          : hexToPrimitiveName(hex);
        const fg = textOnColor(hex);
        const isOpen = openPicker===key;

        return (
          <div key={key} ref={(el) => { if (el) rowRefs.current[key]=el; }}
            className={`${styles.seedRow} ${!isReadOnly?styles.seedRowEditable:""}`}
            onClick={() => handleOpenPicker(key)}
          >
            <div className={styles.seedSwatch} style={{ background:hex }} aria-hidden="true">
              {!isReadOnly && <span className={styles.seedSwatchEdit} style={{ color:fg }}>Change</span>}
            </div>
            <div className={styles.seedInfo}>
              <span className={styles.seedLabel}>{SEED_LABELS[key].label}</span>
              <span className={styles.seedPrimitive}>{primitiveName}</span>
              <span className={styles.seedDescription}>{SEED_LABELS[key].description}</span>
            </div>
            {!isReadOnly && hexInputKey===key ? (
              <HexInput defaultValue={hex}
                onConfirm={(v) => { onDirectHex(key,v); setHexInputKey(null); }}
                onCancel={() => setHexInputKey(null)} />
            ) : (
              <button type="button" className={styles.seedHexBtn}
                onClick={(e) => { e.stopPropagation(); if (!isReadOnly) { setHexInputKey(key); setOpenPicker(null); } }}
                title={isReadOnly ? hex : "Enter a custom hex"}
              >{hex}</button>
            )}
            {isOpen && pickerAnchor && (
              <div className={styles.pickerWrap} style={{ top:pickerAnchor.top,left:pickerAnchor.left }}
                onClick={(e) => e.stopPropagation()}>
                <PrimitivePicker value={varValue}
                  onChange={(val) => { onSeedChange(key,val); setOpenPicker(null); }}
                  onClose={() => setOpenPicker(null)} preferredFamilies={PREFERRED[key]} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Mini preview
// ─────────────────────────────────────────────────────────────────────────────

function ThemePreview({ seeds }: { seeds:ThemeSeeds }) {
  const primary=varToHex(seeds.primary),secondary=varToHex(seeds.secondary);
  const positive=varToHex(seeds.positive),negative=varToHex(seeds.negative);
  const warning=varToHex(seeds.warning),neutral=varToHex(seeds.neutral);
  const fg=textOnColor(primary);

  // Map the theme seeds onto the semantic tokens the real DS components consume,
  // so the live Button/Tag components reflect this theme's colours in the preview.
  const scope = {
    "--ld-semantic-color-action-fill-primary": primary,
    "--ld-semantic-color-action-fill-primary-hovered": primary,
    "--ld-semantic-color-action-fill-primary-pressed": primary,
    "--ld-semantic-color-action-text-on-fill-primary": fg,
    "--ld-semantic-color-action-focus-outline": primary,
    "--ld-semantic-color-action-border-secondary": primary,
    "--ld-semantic-color-action-text-secondary": primary,
    "--ld-semantic-color-text-brand": primary,
    "--ld-semantic-color-border-brand": primary,
  } as React.CSSProperties;

  return (
    <div className={styles.preview} style={scope}>
      <div className={styles.previewRow}>
        <span className={styles.previewRowLabel}>Buttons</span>
        <Button variant="primary" size="small">Primary</Button>
        <Button variant="secondary" size="small">Secondary</Button>
        <Button variant="tertiary" size="small">Tertiary</Button>
      </div>
      <div className={styles.previewRow}>
        <span className={styles.previewRowLabel}>Tags</span>
        <Tag color="brand">Primary</Tag>
        <Tag color="positive">Positive</Tag>
        <Tag color="negative">Negative</Tag>
        <Tag color="warning">Warning</Tag>
      </div>
      <div className={styles.previewRow}>
        <span className={styles.previewRowLabel}>Colors</span>
        {[primary,secondary,positive,negative,warning,neutral].map((hex,i) => (
          <div key={i} className={styles.prevColorChip} style={{ background:hex }} title={hex} />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar list item
// ─────────────────────────────────────────────────────────────────────────────

function ThemeListItem({ theme, isActive, onClick, onDelete }: {
  theme:Theme; isActive:boolean; onClick:()=>void; onDelete?:()=>void;
}) {
  return (
    <div className={`${styles.themeItemWrap} ${isActive?styles.themeItemWrapActive:""}`}>
      <button type="button" className={`${styles.themeItem} ${isActive?styles.themeItemActive:""}`} onClick={onClick}>
        <div className={styles.themeItemSwatches}>
          {theme.colors.slice(0,4).map((c,i) => <div key={i} className={styles.themeItemSwatch} style={{ background:c }} />)}
        </div>
        <div className={styles.themeItemMeta}>
          <span className={styles.themeItemName}>{theme.name}</span>
        </div>
      </button>
      {onDelete && (
        <button
          type="button"
          className={styles.themeDeleteBtn}
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          title={`Delete "${theme.name}"`}
          aria-label={`Delete ${theme.name}`}
        >
          ×
        </button>
      )}
    </div>
  );
}

function SidebarGroup({ label, children, defaultOpen=true }: {
  label:string; children:React.ReactNode; defaultOpen?:boolean;
}) {
  const [open,setOpen] = useState(defaultOpen);
  return (
    <div className={styles.themeGroup}>
      <button type="button" className={styles.themeGroupHeader} onClick={() => setOpen((v)=>!v)}>
        <span className={styles.themeGroupLabel}>{label}</span>
        {open
          ? <ChevronUp width={12} height={12} className={styles.groupChevron} />
          : <ChevronDown width={12} height={12} className={styles.groupChevron} />}
      </button>
      {open && <div className={styles.themeGroupList}>{children}</div>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// New Theme Modal — empty palette, pick seeds from scales
// ─────────────────────────────────────────────────────────────────────────────

const SEED_DEFAULTS: Record<SeedKey, string> = {
  primary: "#0053e2", secondary: "#ffc220", neutral: "#74767c",
  positive: "#2a8703", negative: "#ea1100", warning: "#ffc220",
};

const COLOR_LABELS: Record<SeedKey, string> = {
  primary: "Brand color", secondary: "Accent color", neutral: "Neutral color",
  positive: "Success color", negative: "Error color", warning: "Warning color",
};

const ALL_WIZARD_FAMILIES = PRIMITIVE_COLOR_FAMILIES.filter(
  (f) => [...SCALE_FAMILIES, "magic"].includes(f.family)
);

// ── Step 1: pick/add scales ──────────────────────────────────────────────────
function WizardStep1({
  selected, onToggle,
  customHex, onCustomHexChange, onAddCustom,
}: {
  selected: Set<string>;
  onToggle: (family: string) => void;
  customHex: string;
  onCustomHexChange: (v: string) => void;
  onAddCustom: () => void;
}) {
  const norm = normaliseHex(customHex);
  return (
    <div className={styles.wizardStep}>
      <p className={styles.modalHint}>Select the color scales you want to use in your theme. You can also add a custom scale from a hex value.</p>
      <div className={styles.wizardFamilyGrid}>
        {ALL_WIZARD_FAMILIES.map((fam) => {
          const active = selected.has(fam.family);
          const rep = fam.tokens.filter((t) => typeof t.step === "number").slice(2, 8);
          return (
            <button
              key={fam.family}
              type="button"
              className={`${styles.wizardFamilyCard} ${active ? styles.wizardFamilyCardOn : ""}`}
              onClick={() => onToggle(fam.family)}
            >
              <div className={styles.wizardFamilySwatches}>
                {rep.map((t) => <div key={t.name} className={styles.wizardFamilySwatch} style={{ background: t.hex }} />)}
              </div>
              <div className={styles.wizardFamilyRow}>
                <span className={styles.wizardFamilyName}>{fam.label}</span>
                {active && <span className={styles.wizardFamilyCheck}>✓</span>}
              </div>
            </button>
          );
        })}
      </div>
      {/* Add custom scale */}
      <div className={styles.wizardCustomRow}>
        {norm && <div className={styles.modalHexSwatch} style={{ background: norm }} />}
        <TextField
          label="Add custom scale"
          size="small"
          value={customHex}
          onChange={(e) => onCustomHexChange(e.target.value)}
          placeholder="#hex"
          error={customHex && !norm ? "Invalid hex" : undefined}
          UNSAFE_style={{ width: 120 }}
          inputProps={{ onKeyDown: (e) => { if (e.key === "Enter" && norm) onAddCustom(); } }}
        />
        <Button variant="secondary" size="small" disabled={!norm} onClick={onAddCustom}>Add</Button>
      </div>
    </div>
  );
}

// ── Step 2: assign seed colors from selected scales ──────────────────────────
function WizardStep2({
  selectedFamilies, seeds, onPickSeed,
}: {
  selectedFamilies: typeof ALL_WIZARD_FAMILIES;
  seeds: ThemeSeeds;
  onPickSeed: (key: SeedKey, hex: string) => void;
}) {
  const allTokens = selectedFamilies.flatMap((f) =>
    f.tokens.filter((t) => typeof t.step === "number")
  );

  return (
    <div className={styles.wizardStep}>
      <p className={styles.modalHint}>Click a swatch to assign it as a color value. Each role can have one color.</p>
      {SEED_KEYS.map((key) => {
        const current = seeds[key];
        return (
          <div key={key} className={styles.wizardSeedRow}>
            <div className={styles.wizardSeedLeft}>
              <div className={styles.wizardSeedSwatch} style={{ background: current }} />
              <span className={styles.wizardSeedLabel}>{COLOR_LABELS[key]}</span>
            </div>
            <div className={styles.wizardSeedSwatches}>
              {selectedFamilies.map((fam) => {
                const tokens = fam.tokens.filter((t) => typeof t.step === "number");
                return (
                  <div key={fam.family} className={styles.wizardSeedFamily}>
                    <span className={styles.wizardSeedFamilyName}>{fam.label}</span>
                    <div className={styles.wizardSeedFamilySwatches}>
                      {tokens.map((t) => (
                        <button
                          key={t.name}
                          type="button"
                          className={`${styles.wizardSwatch} ${t.hex === current ? styles.wizardSwatchActive : ""}`}
                          style={{ background: t.hex }}
                          title={`${t.shortName} — ${t.hex}`}
                          onClick={() => onPickSeed(key, t.hex)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
              {allTokens.length === 0 && (
                <span className={styles.wizardNoScales}>Select scales in step 1 first.</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Step 3: name & confirm ───────────────────────────────────────────────────

// ── Main wizard modal ─────────────────────────────────────────────────────────
function NewThemeModal({ open, onClose, onCreate }: {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string, seeds: ThemeSeeds) => void;
}) {
  const [step, setStep]       = useState(1);
  const [name, setName]       = useState("New Theme");
  const [seeds, setSeeds]     = useState<ThemeSeeds>({ ...SEED_DEFAULTS });
  const [selected, setSelected] = useState<Set<string>>(new Set(["blue","gray","green","red","spark"]));
  const [customHex, setCustomHex] = useState("");
  const [customFamilies, setCustomFamilies] = useState<typeof PRIMITIVE_COLOR_FAMILIES>([]);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setStep(1); setName("New Theme"); setSeeds({ ...SEED_DEFAULTS });
      setSelected(new Set(["blue","gray","green","red","spark"]));
      setCustomHex(""); setCustomFamilies([]);
    }
  }, [open]);

  useEffect(() => {
    if (step === 3) setTimeout(() => nameRef.current?.focus(), 50);
  }, [step]);

  const toggleFamily = (fam: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(fam) ? next.delete(fam) : next.add(fam);
      return next;
    });
  };

  const handleAddCustom = () => {
    const norm = normaliseHex(customHex);
    if (!norm) return;
    const id = `custom-${Date.now()}`;
    const tokens = generateColorScale(norm, id);
    const newFam = { family: id, label: `Custom (${norm})`, tokens };
    setCustomFamilies((p) => [...p, newFam]);
    setSelected((p) => new Set([...p, id]));
    setCustomHex("");
  };

  const selectedFamilies = [
    ...ALL_WIZARD_FAMILIES.filter((f) => selected.has(f.family)),
    ...customFamilies.filter((f) => selected.has(f.family)),
  ];

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), seeds);
    onClose();
  };

  const stepLabels = ["Scales", "Colors", "Confirm"];

  return (
    <Modal open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <ModalContent size="medium" maxWidth="560px">
        <ModalHeader>
          <ModalTitle>New Theme</ModalTitle>
        </ModalHeader>

        {/* Step indicator */}
        <div className={styles.wizardSteps}>
          {stepLabels.map((label, i) => (
            <div key={label} className={`${styles.wizardStepDot} ${step === i+1 ? styles.wizardStepDotActive : step > i+1 ? styles.wizardStepDotDone : ""}`}>
              <span className={styles.wizardStepNum}>{step > i+1 ? "✓" : i+1}</span>
              <span className={styles.wizardStepLabel}>{label}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <WizardStep1
            selected={selected}
            onToggle={toggleFamily}
            customHex={customHex}
            onCustomHexChange={setCustomHex}
            onAddCustom={handleAddCustom}
          />
        )}
        {step === 2 && (
          <WizardStep2
            selectedFamilies={selectedFamilies}
            seeds={seeds}
            onPickSeed={(key, hex) => setSeeds((p) => ({ ...p, [key]: hex }))}
          />
        )}
        {step === 3 && (
          <div className={styles.wizardStep}>
            <p className={styles.modalHint}>Give your theme a name and review your color selections.</p>
            <div style={{ marginBottom: 16 }}>
              <TextField
                label="Theme name"
                size="small"
                value={name}
                onChange={(e) => setName(e.target.value)}
                inputProps={{ onKeyDown: (e) => { if (e.key === "Enter") handleCreate(); } }}
              />
            </div>
            <div className={styles.newThemeChecklist}>
              {SEED_KEYS.map((key) => (
                <div key={key} className={styles.newThemeCheckRow}>
                  <div className={styles.newThemeCheckSwatch} style={{ background: seeds[key] }} />
                  <span className={styles.newThemeCheckLabel}>{COLOR_LABELS[key]}</span>
                  <span className={styles.newThemeCheckHex}>{seeds[key]}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <ModalFooter>
          <Button variant="tertiary" size="small"
            onClick={() => step === 1 ? onClose() : setStep((s) => s - 1)}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          {step < 3 ? (
            <Button variant="primary" size="small"
              onClick={() => setStep((s) => s + 1)}
              disabled={step === 1 && selected.size === 0}>
              Next
            </Button>
          ) : (
            <Button variant="primary" size="small"
              disabled={!name.trim()} onClick={handleCreate}>
              Create theme
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function ColorBrowserPage() {
  const [customThemes,setCustomThemes] = useState<Theme[]>(() => {
    try { const s=localStorage.getItem(STORAGE_KEY); return s?JSON.parse(s):[]; } catch { return []; }
  });
  const [customScales,setCustomScales] = useState<CustomScale[]>(() => {
    try { const s=localStorage.getItem(SCALES_KEY); return s?JSON.parse(s):[]; } catch { return []; }
  });

  const [activeId,setActiveId]         = useState("walmart");
  const [editingName,setEditingName]   = useState(false);
  const [draftName,setDraftName]       = useState("");
  const [copied,setCopied]             = useState<string|null>(null);
  const [savedFlash,setSavedFlash]     = useState(false);
  const [newThemeOpen,setNewThemeOpen] = useState(false);
  // In-place seed edits for default (brand) themes, applied on top of the brand's
  // seeds until the user Saves (which forks them) or Resets. Cleared on theme switch.
  const [draftSeeds,setDraftSeeds]     = useState<Partial<ThemeSeeds>>({});
  useEffect(() => { setDraftSeeds({}); }, [activeId]);

  // Live primitive families — re-computed whenever the active app theme changes
  // Palette reference reflects the primitives of the selected brand
  const liveFamilies = useBrandPrimitiveFamilies(activeId);

  useEffect(() => { localStorage.setItem(STORAGE_KEY,JSON.stringify(customThemes)); },[customThemes]);
  useEffect(() => { localStorage.setItem(SCALES_KEY,JSON.stringify(customScales)); },[customScales]);

  const allThemes = [...ALL_DEFAULT,...customThemes];
  const active    = allThemes.find((t) => t.id===activeId)??ALL_DEFAULT[0];
  const isDefault = active.isDefault;
  const isBrand   = active.type==="brand";
  const isCampaign= active.type==="campaign";
  const isCustom  = active.type==="custom";

  // Effective seeds = the theme's seeds plus any in-place draft edits (brands).
  const effectiveSeeds: ThemeSeeds | undefined = active.seeds
    ? { ...active.seeds, ...draftSeeds }
    : undefined;
  const hasDraftSeeds = Object.keys(draftSeeds).length > 0;

  // Palette reference follows the active theme's seed colours (on top of any
  // primitive.css overrides), so the swatches change with the selected theme.
  const seededFamilies = useMemo(
    () => applySeedsToFamilies(liveFamilies, effectiveSeeds),
    [liveFamilies, effectiveSeeds],
  );

  // Palettes shown in the Campaign color-browser panel (campaign defaults + saved).
  const campaignPalettes = useMemo<BrowserPalette[]>(
    () => [...CAMPAIGN_THEMES, ...customThemes].map((t) => ({ id: t.id, name: t.name, colors: t.colors })),
    [customThemes],
  );

  const copyHex = useCallback((hex:string) => {
    navigator.clipboard.writeText(hex).then(() => { setCopied(hex); setTimeout(()=>setCopied(null),1500); });
  },[]);

  const handleFork = useCallback(() => {
    const id=`custom-${Date.now()}`;
    const base:ThemeSeeds = active.seeds ?? {
      primary:active.colors[0]??"#0053e2",secondary:active.colors[1]??"#ffc220",
      neutral:"var(--ld-primitive-color-gray-100)",positive:"var(--ld-primitive-color-green-100)",
      negative:"var(--ld-primitive-color-red-100)",warning:"var(--ld-primitive-color-orange-100)",
    };
    const seeds:ThemeSeeds = { ...base, ...draftSeeds }; // carry in-place edits
    setCustomThemes((p) => [...p,{id,name:`${active.name} Copy`,description:`Based on ${active.name}`,
      type:"custom",seeds,colors:SEED_KEYS.map((k)=>varToHex(seeds[k])),isDefault:false}]);
    setActiveId(id);
  },[active,draftSeeds]);

  const handleSaveCampaignPalette = useCallback((name: string, colors: string[]) => {
    const id = `custom-${Date.now()}`;
    const seeds: ThemeSeeds = {
      primary:  colors[0] ?? "#0053e2",
      secondary:colors[1] ?? "#ffc220",
      neutral:  colors[2] ?? "#74767c",
      positive: colors[3] ?? "#2a8703",
      negative: colors[4] ?? "#ea1100",
      warning:  colors[5] ?? "#ffc220",
    };
    setCustomThemes((p) => [...p, { id, name, type: "custom", seeds, colors, isDefault: false }]);
    setActiveId(id);
  }, []);

  const handleCreateTheme = useCallback((name: string, seeds: ThemeSeeds) => {
    const id = `custom-${Date.now()}`;
    setCustomThemes((p) => [...p, {
      id, name, type: "custom", seeds, isDefault: false,
      colors: SEED_KEYS.map((k) => seeds[k]),
    }]);
    setActiveId(id);
  }, []);

  const handleDelete = useCallback(() => {
    setCustomThemes((p) => p.filter((t) => t.id!==activeId)); setActiveId("walmart");
  },[activeId]);

  const handleSeedChange = useCallback((key:SeedKey,value:string) => {
    // Custom themes persist directly; default (brand) themes edit a draft layer.
    if (isCustom) {
      setCustomThemes((p) => p.map((t) => {
        if (t.id!==activeId||!t.seeds) return t;
        const seeds={...t.seeds,[key]:value};
        return {...t,seeds,colors:SEED_KEYS.map((k)=>varToHex(seeds[k]))};
      }));
    } else {
      setDraftSeeds((d) => ({ ...d, [key]: value }));
    }
  },[activeId,isCustom]);

  const handleSaveName = useCallback(() => {
    if (!draftName.trim()) return;
    setCustomThemes((p) => p.map((t) => t.id===activeId?{...t,name:draftName.trim()}:t));
    setEditingName(false); setSavedFlash(true); setTimeout(()=>setSavedFlash(false),1500);
  },[activeId,draftName]);

  // Reset clears in-progress scale overrides and brand seed edits.
  const handleReset = useCallback(() => {
    setCustomScales([]);
    setDraftSeeds({});
    setSavedFlash(false);
  }, []);

  // Save persists the current edits: forks a default into "My Themes", or
  // confirms a custom theme (already auto-persisted) with a "Saved" flash.
  const handleSaveTheme = useCallback(() => {
    if (isDefault) { handleFork(); return; }
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }, [isDefault, handleFork]);

  const handleExport = useCallback(() => {
    const lines=[`/* Theme: ${active.name} */\n:root {`];
    if (active.seeds) SEED_KEYS.forEach((k)=>lines.push(`  --theme-color-${k}: ${varToHex(active.seeds![k])};`));
    else active.colors.forEach((c,i)=>lines.push(`  --theme-color-${i+1}: ${c};`));
    lines.push("}");
    const blob=new Blob([lines.join("\n")],{type:"text/css"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url; a.download=`theme-${active.name.toLowerCase().replace(/\s+/g,"-")}.css`; a.click();
    URL.revokeObjectURL(url);
  },[active]);

  return (
    <div className={styles.page}>
      {/* ── LEFT: Unified theme/palette sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <span className={styles.sidebarTitle}>Themes</span>
          <Button variant="secondary" size="small" leading={<Plus style={{ width: 14, height: 14 }} />} onClick={() => setNewThemeOpen(true)}>New</Button>
        </div>
        <SidebarGroup label="Brand">
          {BRAND_THEMES.map((t) => <ThemeListItem key={t.id} theme={t} isActive={activeId===t.id} onClick={() => setActiveId(t.id)} />)}
        </SidebarGroup>
        <SidebarGroup label="Campaign Palettes" defaultOpen={false}>
          {CAMPAIGN_THEMES.map((t) => <ThemeListItem key={t.id} theme={t} isActive={activeId===t.id} onClick={() => setActiveId(t.id)} />)}
        </SidebarGroup>
        {customThemes.length>0 && (
          <SidebarGroup label="My Themes">
            {customThemes.map((t) => (
              <ThemeListItem key={t.id} theme={t} isActive={activeId===t.id}
                onClick={() => setActiveId(t.id)}
                onDelete={() => {
                  setCustomThemes((p) => p.filter((x) => x.id !== t.id));
                  if (activeId === t.id) setActiveId("walmart");
                }} />
            ))}
          </SidebarGroup>
        )}
        {customThemes.length===0 && <p className={styles.noCustomHint}>Fork any theme or palette to start customising.</p>}
      </aside>

      {/* ── MAIN: Editor ── */}
      <div className={styles.main}>
        {/* Header */}
        {!isCampaign && (
        <div className={styles.themeHeader}>
          <div className={styles.themeHeaderLeft}>
            {editingName&&isCustom ? (
              <div className={styles.nameEditRow}>
                <TextField label="Theme name" size="small" value={draftName}
                  onChange={(e)=>setDraftName(e.target.value)}
                  inputProps={{ autoFocus: true, onKeyDown: (e)=>{ if(e.key==="Enter")handleSaveName(); if(e.key==="Escape")setEditingName(false); } }} />
                <Button variant="primary" size="small" onClick={handleSaveName}>Save</Button>
                <Button variant="tertiary" size="small" onClick={()=>setEditingName(false)}>Cancel</Button>
              </div>
            ) : (
              <div className={styles.nameRow}>
                <h2 className={styles.themeName}>{active.name}</h2>
                <Badge variant="neutral" size="small">{active.type}</Badge>
                {isCustom && <Button variant="tertiary" size="small" onClick={()=>{ setDraftName(active.name); setEditingName(true); }}>Rename</Button>}
              </div>
            )}
          </div>
          <div className={styles.themeActions}>
            {savedFlash && <Badge variant="success" size="small">Saved</Badge>}
            {copied    && <span className={styles.copiedToast}>Copied {copied}</span>}
            <Button variant="secondary" size="small" onClick={handleExport}>Export CSS</Button>
            <Button variant="tertiary" size="small" disabled={customScales.length === 0 && !hasDraftSeeds} onClick={handleReset}>Reset</Button>
            <Button variant="primary" size="small" onClick={handleSaveTheme}>{isDefault ? "Save as theme" : "Save"}</Button>
            {!isDefault && <Button variant="destructive" size="small" leading={<Trash style={{ width: 14, height: 14 }} />} onClick={handleDelete}>Delete</Button>}
          </div>
        </div>
        )}

        {isDefault && !isCampaign && (
          <div className={styles.defaultBanner}>
            Editing a default theme — adjust seeds and scales, then Save to keep your changes as a new theme.
            <Button variant="primary" size="small" onClick={handleFork}>Fork Theme</Button>
          </div>
        )}

        {/* Campaign Palettes — full color-browser palette generator */}
        {isCampaign && (
          <CampaignColorBrowser
            liveFamilies={liveFamilies}
            palettes={campaignPalettes}
            initialPaletteId={activeId}
            onSavePalette={handleSaveCampaignPalette}
          />
        )}

        {/* Seed editor — collapsible */}
        {!isCampaign && (isBrand||isCustom)&&active.seeds && (
          <CollapsibleSection title="Seed Colors"
            subtitle="Click a seed to change it using the palette picker or enter a custom hex.">
            <SeedEditor theme={{...active, seeds: effectiveSeeds}} onSeedChange={handleSeedChange} onDirectHex={(k,h)=>handleSeedChange(k,h)} isReadOnly={false} />
          </CollapsibleSection>
        )}

        {/* Preview — collapsible */}
        {!isCampaign && (isBrand||isCustom)&&active.seeds && (
          <CollapsibleSection title="Preview" defaultOpen={false}>
            <ThemePreview seeds={effectiveSeeds!} />
          </CollapsibleSection>
        )}

        {/* Palette reference with inline scale generator */}
        {!isCampaign && (
        <CollapsibleSection title="Palette Reference"
          subtitle={`${ALL_PRIMITIVE_TOKENS.length} primitive tokens. Click "+ Add scale" to browse existing scales or create a custom one from a hex value. Click "Edit" on any row to override that scale.`}>
          <ScaleGrid
            onCopy={copyHex}
            customScales={customScales}
            liveFamilies={seededFamilies}
            onAddScale={(name,hex) => {
              const id=`scale-${Date.now()}`;
              setCustomScales((p) => [...p,{id,name,baseHex:hex,tokens:generateColorScale(hex,id)}]);
            }}
            onDeleteScale={(id) => setCustomScales((p) => p.filter((s)=>s.id!==id))}
          />
        </CollapsibleSection>
        )}
      </div>

      <NewThemeModal
        open={newThemeOpen}
        onClose={() => setNewThemeOpen(false)}
        onCreate={handleCreateTheme}
      />
    </div>
  );
}

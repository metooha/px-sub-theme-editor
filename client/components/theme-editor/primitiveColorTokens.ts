/**
 * Static registry of all --ld-primitive-color-* tokens.
 * Sourced directly from public/styles/themes/base/primitive.css
 */

export interface PrimitiveColorToken {
  name: string;       // "--ld-primitive-color-blue-100"
  shortName: string;  // "blue-100"
  family: string;     // "blue"
  step: number | string; // 100 or "5" or "black"/"white"
  hex: string;        // "#0053e2"
}

export interface PrimitiveColorFamily {
  family: string;
  label: string;
  tokens: PrimitiveColorToken[];
}

function tok(family: string, step: number | string, hex: string): PrimitiveColorToken {
  const stepStr = String(step);
  const shortName = stepStr === "base" ? family : `${family}-${stepStr}`;
  const name = `--ld-primitive-color-${shortName}`;
  return { name, shortName, family, step, hex };
}

export const PRIMITIVE_COLOR_FAMILIES: PrimitiveColorFamily[] = [
  {
    family: "black",
    label: "Black",
    tokens: [tok("black", "base", "#000000")],
  },
  {
    family: "white",
    label: "White",
    tokens: [tok("white", "base", "#ffffff")],
  },
  {
    family: "blue",
    label: "Blue",
    tokens: [
      tok("blue", 5,   "#f0f5ff"),
      tok("blue", 10,  "#e9f1fe"),
      tok("blue", 20,  "#c9dcfd"),
      tok("blue", 30,  "#acc8fb"),
      tok("blue", 40,  "#90b5f9"),
      tok("blue", 50,  "#7aa5f6"),
      tok("blue", 60,  "#5e93f3"),
      tok("blue", 70,  "#4380ef"),
      tok("blue", 80,  "#2e70eb"),
      tok("blue", 90,  "#175ee2"),
      tok("blue", 100, "#0053e2"),
      tok("blue", 110, "#114ab6"),
      tok("blue", 120, "#003fb2"),
      tok("blue", 130, "#002e99"),
      tok("blue", 140, "#002185"),
      tok("blue", 150, "#001270"),
      tok("blue", 160, "#001e60"),
      tok("blue", 170, "#080042"),
      tok("blue", 180, "#0e002e"),
    ],
  },
  {
    family: "cyan",
    label: "Cyan",
    tokens: [
      tok("cyan", 5,   "#f0faff"),
      tok("cyan", 10,  "#e7f6fe"),
      tok("cyan", 20,  "#c9ebfd"),
      tok("cyan", 30,  "#90d6f9"),
      tok("cyan", 40,  "#79cdf6"),
      tok("cyan", 50,  "#4dbdf5"),
      tok("cyan", 60,  "#2eacea"),
      tok("cyan", 70,  "#189ee2"),
      tok("cyan", 80,  "#0092db"),
      tok("cyan", 90,  "#0083c7"),
      tok("cyan", 100, "#0076b3"),
      tok("cyan", 110, "#006599"),
      tok("cyan", 120, "#005985"),
      tok("cyan", 130, "#004a70"),
      tok("cyan", 140, "#003857"),
      tok("cyan", 150, "#002e42"),
      tok("cyan", 160, "#001e2e"),
      tok("cyan", 170, "#00101a"),
      tok("cyan", 180, "#000c16"),
    ],
  },
  {
    family: "gray",
    label: "Gray",
    tokens: [
      tok("gray", 5,   "#f8f8f8"),
      tok("gray", 10,  "#f1f1f2"),
      tok("gray", 20,  "#e3e4e5"),
      tok("gray", 30,  "#d5d6d8"),
      tok("gray", 40,  "#c7c8cb"),
      tok("gray", 50,  "#babbbe"),
      tok("gray", 60,  "#acadb0"),
      tok("gray", 70,  "#9e9fa3"),
      tok("gray", 80,  "#909196"),
      tok("gray", 90,  "#828489"),
      tok("gray", 100, "#74767c"),
      tok("gray", 110, "#686a70"),
      tok("gray", 120, "#5d5e63"),
      tok("gray", 130, "#515357"),
      tok("gray", 140, "#46474a"),
      tok("gray", 150, "#3a3b3e"),
      tok("gray", 160, "#2e2f32"),
      tok("gray", 170, "#232325"),
      tok("gray", 180, "#171819"),
    ],
  },
  {
    family: "green",
    label: "Green",
    tokens: [
      tok("green", 5,   "#f4f9f2"),
      tok("green", 10,  "#eaf3e6"),
      tok("green", 20,  "#d4e7cd"),
      tok("green", 30,  "#bfdbb3"),
      tok("green", 40,  "#aacf9a"),
      tok("green", 50,  "#95c381"),
      tok("green", 60,  "#7fb768"),
      tok("green", 70,  "#6aab4f"),
      tok("green", 80,  "#559f35"),
      tok("green", 90,  "#3f931c"),
      tok("green", 100, "#2a8703"),
      tok("green", 110, "#267a03"),
      tok("green", 120, "#226c02"),
      tok("green", 130, "#1d5f02"),
      tok("green", 140, "#195102"),
      tok("green", 150, "#154402"),
      tok("green", 160, "#113601"),
      tok("green", 170, "#0d2901"),
      tok("green", 180, "#081b01"),
    ],
  },
  {
    family: "orange",
    label: "Orange",
    tokens: [
      tok("orange", 5,   "#fff7f2"),
      tok("orange", 10,  "#fff0e6"),
      tok("orange", 20,  "#fee0cc"),
      tok("orange", 30,  "#fed1b3"),
      tok("orange", 40,  "#fdc199"),
      tok("orange", 50,  "#fdb280"),
      tok("orange", 60,  "#fca266"),
      tok("orange", 70,  "#fc934d"),
      tok("orange", 80,  "#fb8333"),
      tok("orange", 90,  "#fb741a"),
      tok("orange", 100, "#fa6400"),
      tok("orange", 110, "#e15300"),
      tok("orange", 120, "#c83c00"),
      tok("orange", 130, "#af2f00"),
      tok("orange", 140, "#962300"),
      tok("orange", 150, "#7d1900"),
      tok("orange", 160, "#641100"),
      tok("orange", 170, "#4b0a00"),
      tok("orange", 180, "#320500"),
    ],
  },
  {
    family: "pink",
    label: "Pink",
    tokens: [
      tok("pink", 5,   "#fef6fb"),
      tok("pink", 10,  "#fce9f5"),
      tok("pink", 20,  "#f8d2e3"),
      tok("pink", 30,  "#f4bdd3"),
      tok("pink", 40,  "#f0adcc"),
      tok("pink", 50,  "#ea9ac3"),
      tok("pink", 60,  "#e587ba"),
      tok("pink", 70,  "#df74b1"),
      tok("pink", 80,  "#d95fa7"),
      tok("pink", 90,  "#d3479d"),
      tok("pink", 100, "#cb2c90"),
      tok("pink", 110, "#b62781"),
      tok("pink", 120, "#b1267d"),
      tok("pink", 130, "#8c1e64"),
      tok("pink", 140, "#781a55"),
      tok("pink", 150, "#651648"),
      tok("pink", 160, "#51123a"),
      tok("pink", 170, "#3e0e2c"),
      tok("pink", 180, "#2e0a21"),
    ],
  },
  {
    family: "purple",
    label: "Purple",
    tokens: [
      tok("purple", 5,   "#f7f5f9"),
      tok("purple", 10,  "#efebf2"),
      tok("purple", 20,  "#e0d6e5"),
      tok("purple", 30,  "#d0c2d8"),
      tok("purple", 40,  "#c1adcb"),
      tok("purple", 50,  "#b199bf"),
      tok("purple", 60,  "#a184b2"),
      tok("purple", 70,  "#9270a5"),
      tok("purple", 80,  "#825b98"),
      tok("purple", 90,  "#73478b"),
      tok("purple", 100, "#63327e"),
      tok("purple", 110, "#592d71"),
      tok("purple", 120, "#4f2865"),
      tok("purple", 130, "#452358"),
      tok("purple", 140, "#3b1e4c"),
      tok("purple", 150, "#32193f"),
      tok("purple", 160, "#281432"),
      tok("purple", 170, "#1e0f26"),
      tok("purple", 180, "#140a19"),
    ],
  },
  {
    family: "red",
    label: "Red",
    tokens: [
      tok("red", 5,   "#fef2f1"),
      tok("red", 10,  "#fde9e8"),
      tok("red", 20,  "#fbd0cc"),
      tok("red", 30,  "#f9bdb8"),
      tok("red", 40,  "#f8aca6"),
      tok("red", 50,  "#f69991"),
      tok("red", 60,  "#f4857c"),
      tok("red", 70,  "#f27066"),
      tok("red", 80,  "#f0594d"),
      tok("red", 90,  "#ee392b"),
      tok("red", 100, "#ea1100"),
      tok("red", 110, "#ce0f00"),
      tok("red", 120, "#b70d00"),
      tok("red", 130, "#a20c00"),
      tok("red", 140, "#8d0a00"),
      tok("red", 150, "#780900"),
      tok("red", 160, "#630700"),
      tok("red", 170, "#500600"),
      tok("red", 180, "#3d0400"),
    ],
  },
  {
    family: "spark",
    label: "Spark",
    tokens: [
      tok("spark", 5,   "#fffcf4"),
      tok("spark", 10,  "#fef6de"),
      tok("spark", 20,  "#fff3d2"),
      tok("spark", 30,  "#ffedbc"),
      tok("spark", 40,  "#ffe7a6"),
      tok("spark", 50,  "#fbe298"),
      tok("spark", 60,  "#ffda79"),
      tok("spark", 70,  "#ffd463"),
      tok("spark", 80,  "#ffce4d"),
      tok("spark", 90,  "#ffc836"),
      tok("spark", 100, "#ffc220"),
      tok("spark", 110, "#e6a31d"),
      tok("spark", 120, "#cc851a"),
      tok("spark", 130, "#b36a16"),
      tok("spark", 140, "#995213"),
      tok("spark", 150, "#803d10"),
      tok("spark", 160, "#662b0d"),
      tok("spark", 170, "#4d1c0a"),
      tok("spark", 180, "#330f06"),
    ],
  },
  {
    family: "teal",
    label: "Teal",
    tokens: [
      tok("teal", 5,   "#f0f9fb"),
      tok("teal", 10,  "#e1f3f8"),
      tok("teal", 20,  "#c3e7ef"),
      tok("teal", 30,  "#a3dbe9"),
      tok("teal", 40,  "#82cfe1"),
      tok("teal", 50,  "#5dc3da"),
      tok("teal", 60,  "#25b6d3"),
      tok("teal", 70,  "#00a9c6"),
      tok("teal", 80,  "#009ab7"),
      tok("teal", 90,  "#008daa"),
      tok("teal", 100, "#00809e"),
      tok("teal", 110, "#00748f"),
      tok("teal", 120, "#00667f"),
      tok("teal", 130, "#005a6f"),
      tok("teal", 140, "#004d5f"),
      tok("teal", 150, "#00404f"),
      tok("teal", 160, "#00333f"),
      tok("teal", 170, "#00262f"),
      tok("teal", 180, "#001a1f"),
    ],
  },
  {
    family: "yellow",
    label: "Yellow",
    tokens: [
      tok("yellow", 5,   "#fffef2"),
      tok("yellow", 10,  "#fffee6"),
      tok("yellow", 20,  "#fffccc"),
      tok("yellow", 30,  "#fffbb3"),
      tok("yellow", 40,  "#fffa99"),
      tok("yellow", 50,  "#fff980"),
      tok("yellow", 60,  "#fff766"),
      tok("yellow", 70,  "#fff64d"),
      tok("yellow", 80,  "#fff533"),
      tok("yellow", 90,  "#fff31a"),
      tok("yellow", 100, "#fff200"),
      tok("yellow", 110, "#e6cb00"),
      tok("yellow", 120, "#cca700"),
      tok("yellow", 130, "#b38600"),
      tok("yellow", 140, "#996900"),
      tok("yellow", 150, "#804f00"),
      tok("yellow", 160, "#663800"),
      tok("yellow", 170, "#4d2500"),
      tok("yellow", 180, "#331500"),
    ],
  },
  {
    family: "magic",
    label: "Magic",
    tokens: [
      tok("magic", 1, "#0053E2"),
      tok("magic", 2, "#a4fb6c"),
      tok("magic", 3, "#79CDF6"),
      tok("magic", 4, "#E9F1FE"),
    ],
  },
  {
    family: "transparent-dark",
    label: "Transparent Dark",
    tokens: [
      tok("transparent-dark", 0,  "#00000000"),
      tok("transparent-dark", 10, "#0000001a"),
      tok("transparent-dark", 20, "#00000033"),
      tok("transparent-dark", 30, "#0000004d"),
      tok("transparent-dark", 40, "#00000066"),
      tok("transparent-dark", 50, "#00000080"),
      tok("transparent-dark", 60, "#00000099"),
      tok("transparent-dark", 70, "#000000b3"),
      tok("transparent-dark", 80, "#000000cc"),
      tok("transparent-dark", 90, "#000000e6"),
    ],
  },
  {
    family: "transparent-light",
    label: "Transparent Light",
    tokens: [
      tok("transparent-light", 0,  "#ffffff00"),
      tok("transparent-light", 10, "#ffffff1a"),
      tok("transparent-light", 20, "#ffffff33"),
      tok("transparent-light", 30, "#ffffff4d"),
      tok("transparent-light", 40, "#ffffff66"),
      tok("transparent-light", 50, "#ffffff80"),
      tok("transparent-light", 60, "#ffffff99"),
      tok("transparent-light", 70, "#ffffffb3"),
      tok("transparent-light", 80, "#ffffffcc"),
      tok("transparent-light", 90, "#ffffffe6"),
    ],
  },
];

/** All tokens flattened into one array */
export const ALL_PRIMITIVE_TOKENS: PrimitiveColorToken[] = PRIMITIVE_COLOR_FAMILIES.flatMap(
  (f) => f.tokens
);

/**
 * Parse a var(--ld-primitive-color-*) string and return the token name.
 * e.g. "var(--ld-primitive-color-blue-100)" → "--ld-primitive-color-blue-100"
 * Returns null if the string is not a valid primitive var reference.
 */
export function parsePrimitiveVar(varString: string): string | null {
  const match = varString.match(/var\((--ld-primitive-color-[^,)]+)/);
  return match ? match[1] : null;
}

/**
 * Wrap a primitive token name in var(...)
 * e.g. "--ld-primitive-color-blue-100" → "var(--ld-primitive-color-blue-100)"
 */
export function toPrimitiveVar(name: string): string {
  return `var(${name})`;
}

/**
 * Find a primitive token by its CSS variable name.
 */
export function findPrimitiveToken(name: string): PrimitiveColorToken | undefined {
  return ALL_PRIMITIVE_TOKENS.find((t) => t.name === name);
}

/**
 * Given a var() string, find and return the resolved hex color.
 * e.g. "var(--ld-primitive-color-blue-100)" → "#0053e2"
 */
export function resolveHexFromPrimitiveVar(varString: string): string | null {
  const name = parsePrimitiveVar(varString);
  if (!name) return null;
  return findPrimitiveToken(name)?.hex ?? null;
}

/** Parse a #rgb / #rrggbb / #rrggbbaa hex into [r, g, b], ignoring alpha. */
function hexToRgb(hex: string): [number, number, number] | null {
  let h = hex.trim().replace(/^#/, "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6 && h.length !== 8) return null;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return [r, g, b];
}

// Families excluded from closest-match (special/utility, not true hue families).
const NON_HUE_FAMILIES = new Set(["transparent-dark", "transparent-light", "magic"]);

/**
 * Find the primitive color family whose tokens contain the color closest to the
 * given hex (by squared RGB distance). Returns the family name, e.g. "cyan".
 * Special/utility families (transparent, magic) are excluded.
 */
export function findClosestPrimitiveFamily(hex: string): string | null {
  const target = hexToRgb(hex);
  if (!target) return null;
  let best: { family: string; dist: number } | null = null;
  for (const token of ALL_PRIMITIVE_TOKENS) {
    if (NON_HUE_FAMILIES.has(token.family)) continue;
    const rgb = hexToRgb(token.hex);
    if (!rgb) continue;
    const dist =
      (rgb[0] - target[0]) ** 2 +
      (rgb[1] - target[1]) ** 2 +
      (rgb[2] - target[2]) ** 2;
    if (!best || dist < best.dist) best = { family: token.family, dist };
  }
  return best?.family ?? null;
}

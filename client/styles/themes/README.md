# Theme System - Inheritance Model

## Quick Reference

This theme system uses **CSS cascade inheritance** where all themes inherit from the base theme and only override what they need to change.

---

## Theme Structure

```
themes/
├── base/                    ← COMPLETE TOKEN SET (always loaded)
│   ├── primitive.css       200+ primitive tokens
│   └── semantic.css        257+ semantic tokens (LD 3.5 + WCP)
│
├── walmart-b2b/            ← OVERRIDES ONLY (loaded on top of base)
│   ├── primitive.css       0 overrides (empty)
│   └── semantic.css        30 overrides (brand colors only)
│
└── [your-theme]/           ← OVERRIDES ONLY
    ├── primitive.css       0-10 overrides (rarely needed)
    └── semantic.css        20-100 overrides (brand colors)
```

---

## How Inheritance Works

### CSS Loading Order

```html
<!-- Step 1: Base theme (always loaded) -->
<link data-theme-base="primitive" href="/styles/themes/base/primitive.css">
<link data-theme-base="semantic" href="/styles/themes/base/semantic.css">

<!-- Step 2: Theme overrides (loaded when theme selected) -->
<link data-theme-override="semantic" href="/styles/themes/walmart-b2b/semantic.css">
```

### CSS Cascade

```css
/* In base/semantic.css */
:root {
  --ld-semantic-color-action-fill-primary: #0053e2;  /* Walmart blue */
  --ld-semantic-spacing-200: 1rem;                    /* 16px */
  --ld-semantic-elevation-100: 0 1px 2px ...;        /* Shadow */
}

/* In walmart-b2b/semantic.css (loaded after base) */
:root {
  --ld-semantic-color-action-fill-primary: #002e99;  /* OVERRIDES to navy */
  /* spacing-200 and elevation-100 inherit from base */
}

/* Result: B2B theme has navy buttons but same spacing and shadows as base */
```

---

## File Size Examples

### Base Theme (Complete)
- **primitive.css**: ~14KB, 200+ tokens
- **semantic.css**: ~81KB, 257+ tokens
- **Total**: ~95KB

### B2B Theme (Overrides Only)
- **primitive.css**: ~1KB, 0 tokens (empty)
- **semantic.css**: ~3KB, 30 tokens
- **Total**: ~4KB (**96% smaller!**)

### Future Dark Mode Theme (Estimated)
- **primitive.css**: ~1KB, 0 tokens
- **semantic.css**: ~5KB, ~50-80 overrides (inverted colors)
- **Total**: ~6KB

---

## Creating a New Theme

### ❌ DON'T DO THIS (Old Way)

```css
/* DON'T copy 257+ tokens from base! */
:root {
  --ld-semantic-color-text: var(...);
  --ld-semantic-color-text-subtle: var(...);
  --ld-semantic-color-text-brand: var(...);     ← Only this changed!
  --ld-semantic-spacing-100: var(...);
  --ld-semantic-spacing-200: var(...);
  --ld-semantic-spacing-300: var(...);
  /* ... 250+ more duplicated tokens ... */
}
```
**Problems**: 
- 324 lines when only 1 token changed
- Maintenance nightmare
- Unclear what the theme actually changes

### ✅ DO THIS (Inheritance Model)

```css
/* Only override what changes! */
:root {
  --ld-semantic-color-text-brand: var(...);     ← Only this!
}

/* Everything else inherits from base automatically */
```
**Benefits**:
- 5 lines instead of 324
- Crystal clear what the theme changes
- Easy to maintain
- Base updates automatically propagate

---

## Real-World Example: Walmart Business Theme

**What it changes**: Brand color from Walmart blue → Navy blue

**Complete B2B semantic.css file** (96 lines total):

```css
:root {
  /* Primary brand colors - 30 overrides */
  --ld-semantic-color-action-fill-primary: #002e99;        /* Button */
  --ld-semantic-color-text-brand: #002e99;                 /* Text */
  --ld-semantic-color-border-activated: #001e60;           /* Borders */
  --ld-semantic-color-icon-brand: #002e99;                 /* Icons */
  /* ... 26 more brand color overrides ... */
  
  /* WCP alt button - 5 overrides */
  --wcp-semantic-color-action-fill-primary-alt: #4dbdf5;   /* Cyan instead of yellow */
  /* ... 4 more WCP overrides ... */
}

/* That's it! 35 total overrides, 227+ inherited */
```

**Everything else** (spacing, typography, shadows, error colors, etc.) **inherits from base** automatically.

---

## Theme Addition Checklist

When creating a new theme:

1. ✅ Create minimal primitive.css (usually empty)
2. ✅ Create semantic.css with ONLY overrides
3. ✅ Include inheritance comment block
4. ✅ Test that inherited tokens work
5. ✅ Verify file is <100 lines (if larger, you're duplicating)
6. ✅ Document what you're overriding and why

---

## Quick Reference: What to Override

### Common Overrides (Brand Colors)
- ✅ `--ld-semantic-color-action-fill-primary` (and hover/pressed variants)
- ✅ `--ld-semantic-color-text-brand`
- ✅ `--ld-semantic-color-border-activated`
- ✅ `--ld-semantic-color-fill-brand`
- ✅ `--ld-semantic-color-icon-brand`
- ✅ `--ld-semantic-color-action-focus-outline`

### Rarely Override
- ⚠️ Surface/background colors (unless completely different theme)
- ⚠️ WCP extension colors (only if theme-specific)

### Never Override
- ❌ Spacing tokens (keep consistent)
- ❌ Typography tokens (same fonts across themes)
- ❌ Border radius (same shapes)
- ❌ Elevation/shadows (same depth)
- ❌ Error colors (red should stay red)
- ❌ Success colors (green should stay green)
- ❌ Duration/timing (same animations)
- ❌ Z-index (same layering)

---

## Summary

**Inheritance Model = Less Code + More Clarity**

- 📦 Base theme: Complete token set (257+ tokens)
- 🎨 Override themes: Only what changes (20-50 tokens)
- ✅ Automatic inheritance: No duplication
- 🚀 Faster loading: Smaller CSS files
- 🔧 Easier maintenance: Update base, all themes benefit

**Rule of Thumb**: If your theme file is >150 lines, you're probably duplicating instead of inheriting!

---

## More Information

See: `guidelines/RULE_ThemeSwitcher.md` for complete documentation

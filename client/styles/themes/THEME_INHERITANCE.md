# Theme Inheritance Model

## Overview

This theme system follows the exact inheritance structure from Airtable, where themes inherit from parent themes and add minimal overrides.

## Complete Inheritance Tree

```
LD BASE (root)
│
├─→ DEVELOPER
│   ├─→ Customer
│   ├─→ Associate
│   └─→ Partner
│
├─→ WCP
│
├─→ AX
│   ├─→ AX Sam's Club
│   └─→ AX Walmart
│
├─→ PX
│   ├─→ Data Ventures
│   ├─→ PX Sam's Club
│   └─→ PX Walmart
│
├─→ Sam's Club (standalone)
│
└─→ Cashi MX (standalone)
```

## Standalone Themes (also inherit LD Base)

- **Bodega** (Mexico)
- **Walmart Legacy** (Classic Walmart)
- **Walmart W+** (Plus membership)
- **Sparky** (Internal tools)
- **Member's Mark** (Private label)

## Current Walmart B2B

**Walmart B2B** currently inherits: LD Base + WCP

## Theme Descriptions

### LD Base
- **Path**: `themes/base/`
- **Status**: Root theme with all standard LD 3.5 tokens
- **Prefix**: `ld-`
- **Children**: All themes inherit from this

### Developer
- **Path**: `themes/developer/`
- **Inherits**: LD Base
- **Override**: Green magic gradient (#a4fb6c middle)
- **Personas**: Customer, Associate, Partner

### Customer
- **Path**: `themes/customer/`
- **Inherits**: Developer
- **Usage**: Customer-facing applications
- **Overrides**: None (pure Developer)

### Associate
- **Path**: `themes/associate/`
- **Inherits**: Developer
- **Usage**: Employee/associate applications
- **Overrides**: None (pure Developer)

### Partner
- **Path**: `themes/partner/`
- **Inherits**: Developer
- **Usage**: Partner portal applications
- **Overrides**: Minimal partner-specific UX

### WCP
- **Path**: `themes/wcp/`
- **Inherits**: LD Base
- **Tokens**: Adds `wcp-` prefix tokens for commerce
- **Usage**: Walmart Commerce Platform
- **Used by**: Walmart B2B

### AX
- **Path**: `themes/ax/`
- **Inherits**: LD Base
- **Usage**: Advertising experience platform
- **Children**: AX Sam's Club, AX Walmart

### PX
- **Path**: `themes/px/`
- **Inherits**: LD Base
- **Usage**: Partner experience platform
- **Children**: Data Ventures, PX Sam's Club, PX Walmart

### Data Ventures
- **Path**: `themes/data-ventures/`
- **Inherits**: PX
- **Brand**: Purple (#6245b7)
- **Usage**: Data/analytics platform for partners

### Sam's Club
- **Path**: `themes/sams-club/`
- **Inherits**: LD Base (direct)
- **Brand**: Blue (#0062ad)
- **Font**: Gibson

### Cashi MX
- **Path**: `themes/cashi-mx/`
- **Inherits**: LD Base (direct)
- **Brand**: Purple (#6212b2)
- **Usage**: Mexico financial services

### Bodega
- **Path**: `themes/bodega/`
- **Inherits**: LD Base
- **Brand**: Green (#2c981d)
- **Market**: Mexico

### Walmart Legacy
- **Path**: `themes/walmart-legacy/`
- **Inherits**: LD Base
- **Brand**: Classic Walmart blue (#0071dc)
- **Font**: Bogle (legacy)

### Walmart W+ (Plus)
- **Path**: `themes/walmart-plus/`
- **Inherits**: LD Base
- **Special**: Yellow warnings instead of spark
- **Usage**: Walmart+ membership

### Sparky
- **Path**: `themes/sparky/`
- **Inherits**: LD Base
- **Brand**: Dark navy (#001e60)
- **Backgrounds**: Cyan subtle
- **Usage**: Internal tools

### Member's Mark
- **Path**: `themes/members-mark/`
- **Inherits**: LD Base
- **Brand**: Dark gray (#283645)
- **Top Nav**: Beige (#fcf6f0)
- **Usage**: Private label

## Theme Loading Strategy

### CSS Load Order

```html
<!-- 1. Always load LD Base -->
<link href="/styles/themes/base/primitive.css">
<link href="/styles/themes/base/semantic.css">

<!-- 2. Load parent theme if needed (e.g., Developer) -->
<link href="/styles/themes/developer/primitive.css">
<link href="/styles/themes/developer/semantic.css">

<!-- 3. Load specific theme/persona -->
<link href="/styles/themes/customer/semantic.css">

<!-- Result: LD Base → Developer → Customer cascade -->
```

### For Walmart B2B

```html
<link href="/styles/themes/base/primitive.css">
<link href="/styles/themes/base/semantic.css">
<link href="/styles/themes/wcp/semantic.css">
<link href="/styles/themes/walmart-b2b/semantic.css">

<!-- Result: LD Base → WCP → Walmart B2B cascade -->
```

## File Sizes (Optimized via Inheritance)

- **LD Base**: ~95KB (complete token set)
- **Developer**: ~1KB (magic color override only)
- **Customer/Associate**: ~1KB each (pure inheritance)
- **Partner**: ~1KB (minimal overrides)
- **WCP**: ~4KB (wcp- tokens)
- **Theme overrides**: ~2-5KB each (brand colors only)

**Total**: ~120KB for entire theme system (vs. ~1.5MB if duplicated)

## Token Prefixes

### `ld-` (Living Design)
- Standard LD 3.5 tokens
- Available in ALL themes
- Example: `--ld-semantic-color-action-fill-primary`

### `wcp-` (Walmart Commerce Platform)
- Extended tokens for commerce features
- Available in: WCP, Walmart B2B
- Example: `--wcp-semantic-color-action-fill-primary-alt`

## Quick Reference

| Theme | Inherits | Brand Color | Font | Special |
|-------|----------|-------------|------|---------|
| LD Base | - | #0053e2 (blue) | EverydaySans | Root |
| Developer | LD Base | - | - | Green magic |
| Customer | Developer | - | - | Persona |
| Associate | Developer | - | - | Persona |
| Partner | Developer | - | - | Persona |
| WCP | LD Base | - | - | wcp- tokens |
| AX | LD Base | - | - | Ad platform |
| PX | LD Base | - | - | Partner platform |
| Data Ventures | PX | #6245b7 (purple) | - | Analytics |
| Sam's Club | LD Base | #0062ad (blue) | Gibson | Retail |
| Cashi MX | LD Base | #6212b2 (purple) | - | MX Finance |
| Bodega | LD Base | #2c981d (green) | - | MX Retail |
| Walmart Legacy | LD Base | #0071dc (blue) | Bogle | Classic |
| Walmart W+ | LD Base | - | - | Yellow warnings |
| Sparky | LD Base | #001e60 (navy) | - | Internal |
| Member's Mark | LD Base | #283645 (gray) | - | Private label |
| Walmart B2B | LD Base + WCP | #002e99 (navy) | - | Business |

---

Last updated: 2025-02-14

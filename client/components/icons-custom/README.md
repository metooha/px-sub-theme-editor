# Custom Icons Folder

## ⚠️ Important Notice

This folder is for **custom icons ONLY** that don't exist in the core LD 3.5 icon library.

## Before Adding Icons Here

**STOP!** Before creating a new icon, you **MUST**:

1. ✅ Search all **306 icons** in `client/components/icons/`
2. ✅ Check the Component Library at `/component-library#icons`
3. ✅ Look for similar icons by function (not just name)
4. ✅ Review `guidelines/RULE_IconUsage.md` for complete list

## Available Icon Categories (306 Icons)

The core library includes icons for:
- Navigation & Arrows (16 icons)
- Actions & Controls (25+ icons)
- Communication (13 icons)
- Media & Files (18 icons)
- User & Account (12 icons)
- Commerce & Shopping (21+ icons)
- Location & Maps (10 icons)
- Store & Retail (11 icons)
- Charts & Data (11 icons)
- Status & Indicators (25+ icons)
- Logistics & Shipping (18+ icons)
- Products (10 icons)
- And many more...

## Creating Custom Icons

Only if NO equivalent exists in the core library:

### Template

```tsx
// MyCustomIcon.tsx
import { SVGProps } from 'react';

export const MyCustomIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none"
    {...props}
  >
    <path 
      d="M..." 
      stroke="currentColor" 
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
```

### LD 3.5 Specifications

- **Size**: 20x20 viewBox (standard)
- **Stroke width**: 1.5px
- **Color**: `currentColor` (for semantic theming)
- **Props**: Accept `SVGProps<SVGSVGElement>`
- **Export**: Named export

### Export

Add to `index.tsx`:

```tsx
export { MyCustomIcon } from './MyCustomIcon';
```

### Usage

```tsx
import { MyCustomIcon } from '@/components/icons-custom';

<MyCustomIcon style={{ color: 'var(--ld-semantic-color-text-brand)' }} />
```

## Questions?

- See: `guidelines/RULE_IconUsage.md`
- View all icons: `/component-library#icons`
- Core library: `client/components/icons/`

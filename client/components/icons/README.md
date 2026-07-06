# Icons

This folder contains SVG icons for the project, organized from the Walmart/LiveDesign design system.

## Usage

### As React Components

Import icons from the index file:

```tsx
import { ArrowDown, Bell, SGHome } from '@/components/icons';

function MyComponent() {
  return (
    <div>
      <ArrowDown className="w-6 h-6 text-blue-500" />
      <Bell className="w-8 h-8 text-gray-700" />
      <SGHome className="w-5 h-5" />
    </div>
  );
}
```

### As SVG Files

You can also import the SVG files directly if needed:

```tsx
import ArrowDownSvg from '@/components/icons/ArrowDown.svg';
```

## Available Icons

### WCP Icons
- `SGHome` - Home icon with heart
- `SGShareImpact` - Share impact chat bubbles icon

### LD 3.5 Icons
- `ArrowDown` - Down arrow
- `ArrowLeft` - Left arrow
- `ArrowRight` - Right arrow
- `ArrowUp` - Up arrow
- `Article` - Article/document icon
- `Ban` - Ban/prohibit circle icon
- `Barcode` - Barcode scanner icon
- `Bell` - Notification bell icon

## Styling

All icons use `fill="currentColor"` which means they will inherit the text color from their parent. You can style them using:

- **Tailwind classes**: `className="w-6 h-6 text-blue-500"`
- **Inline styles**: `style={{ width: 24, height: 24, color: '#0053E2' }}`
- **CSS classes**: Standard CSS color and sizing

## Default Size

Icons default to 32x32px. Override with width/height props or CSS.

```tsx
<Bell width={20} height={20} />
<Bell className="w-5 h-5" /> {/* Tailwind */}
```

# Asset Library

This directory contains all project assets including images, icons, and other media files.

## Structure

```
assets/
├── asset-library.json    # Complete manifest of all assets
├── icons/                # Icon assets
├── images/               # Image assets
└── README.md            # This file
```

## Usage

### In React Components

```typescript
import { assets, getAsset } from '@/lib/assets';

// Direct access
<img src={assets.icons.calendar} alt="Calendar" />

// With helper function
<img src={getAsset('icons.calendar', 32)} alt="Calendar" />

// Dashboard screenshot
<img src={assets.dashboard.screenshot} alt="Dashboard" />
```

## Available Assets

### Dashboard
- **screenshot** - Main dashboard screenshot showing campaign analytics

### Icons (16x16 - 48x48)
- **calendar** - Calendar icon for date selection
- **chevronDown** - Chevron down icon for dropdowns  
- **alert** - Alert icon for recommendations (48x48)
- **lightning** - Lightning/panel icon for recommendations (48x48)

### Product Previews
- **items** - Product preview thumbnails for recommended items (424x48)

## Asset Sources

All images are currently hosted on Builder.io CDN for optimal performance and delivery.

## Adding New Assets

1. Add the image URL to `asset-library.json`
2. Add the corresponding entry to `client/lib/assets.ts`
3. Update this README with the new asset information

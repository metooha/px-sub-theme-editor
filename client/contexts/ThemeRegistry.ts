/**
 * Theme Registry
 * Central registry for all available themes in the application
 */

export interface Theme {
  id: 'walmart' | 'walmart-b2b' |
      'wcp' | 'ax' | 'ax-sams-club' | 'ax-walmart' |
      'px' | 'px-sams-club' | 'px-walmart' | 'data-ventures' |
      'sams-club' | 'cashi-mx' | 'bodega' | 'walmart-legacy' | 'walmart-plus' |
      'sparky' | 'members-mark';
  name: string;
  description: string;
  primitiveCSS: string;
  semanticCSS: string;
  previewColor?: string; // Visual indicator color for UI
  inherits?: string; // Parent theme for documentation
  hidden?: boolean; // Hide from dropdown (platform/base themes)
}

export const AVAILABLE_THEMES: Theme[] = [
  // ========== WALMART (Main) ==========
  {
    id: 'walmart',
    name: 'Walmart',
    description: 'Default Walmart theme with commerce platform features',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/wcp/semantic.css',
    previewColor: '#0053e2',
    inherits: 'LD Base + WCP',
  },
  {
    id: 'walmart-b2b',
    name: 'Walmart Business',
    description: 'B2B platform with navy blue and professional palette',
    primitiveCSS: '/styles/themes/walmart-b2b/primitive.css',
    semanticCSS: '/styles/themes/walmart-b2b/semantic.css',
    previewColor: '#002e99',
    inherits: 'walmart',
  },

  // ========== WCP (Commerce Platform) ==========
  {
    id: 'wcp',
    name: 'WCP',
    description: 'Walmart Commerce Platform with extended commerce tokens',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/wcp/semantic.css',
    previewColor: '#ffc220',
    inherits: 'LD Base + Customer',
    hidden: true, // Base platform theme
  },

  // ========== AX (Advertising Experience) ==========
  {
    id: 'ax',
    name: 'AX',
    description: 'Advertising experience platform',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/ax/semantic.css',
    previewColor: '#0053e2',
    inherits: 'base',
    hidden: true, // Platform theme
  },
  {
    id: 'ax-sams-club',
    name: 'AX Sam\'s Club',
    description: 'Sam\'s Club brand on AX platform',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/ax-sams-club/semantic.css',
    previewColor: '#0062ad',
    inherits: 'ax',
    hidden: true, // Platform variant
  },
  {
    id: 'ax-walmart',
    name: 'AX Walmart',
    description: 'Walmart brand on AX platform',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/ax-walmart/semantic.css',
    previewColor: '#0053e2',
    inherits: 'ax',
    hidden: true, // Platform variant
  },

  // ========== PX (Partner Experience) ==========
  {
    id: 'px',
    name: 'PX',
    description: 'Partner experience platform',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/px/semantic.css',
    previewColor: '#0053e2',
    inherits: 'base',
    hidden: true, // Platform theme
  },
  {
    id: 'data-ventures',
    name: 'Data Ventures',
    description: 'Data/analytics platform for partners with purple brand',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/data-ventures/semantic.css',
    previewColor: '#6245b7',
    inherits: 'px',
  },
  {
    id: 'px-sams-club',
    name: 'PX Sam\'s Club',
    description: 'Sam\'s Club brand on PX platform',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/px-sams-club/semantic.css',
    previewColor: '#0062ad',
    inherits: 'px',
    hidden: true, // Platform variant
  },
  {
    id: 'px-walmart',
    name: 'PX Walmart',
    description: 'Walmart brand on PX platform',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/px-walmart/semantic.css',
    previewColor: '#0053e2',
    inherits: 'px',
    hidden: true, // Platform variant
  },

  // ========== STANDALONE THEMES ==========
  {
    id: 'sams-club',
    name: 'Sam\'s Club',
    description: 'Sam\'s Club retail brand with Gibson font',
    primitiveCSS: '/styles/themes/sams-club/primitive.css',
    semanticCSS: '/styles/themes/sams-club/semantic.css',
    previewColor: '#0086ed',
    inherits: 'wcp',
  },
  {
    id: 'cashi-mx',
    name: 'Cashi MX',
    description: 'Mexico financial services with purple brand',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/cashi-mx/semantic.css',
    previewColor: '#6212b2',
    inherits: 'base',
  },
  {
    id: 'bodega',
    name: 'Bodega',
    description: 'Walmart Mexico with green brand',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/bodega/semantic.css',
    previewColor: '#2c981d',
    inherits: 'wcp',
  },
  {
    id: 'walmart-legacy',
    name: 'Walmart Legacy',
    description: 'Classic Walmart blue with Bogle font',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/walmart-legacy/semantic.css',
    previewColor: '#0071dc',
    inherits: 'wcp',
  },
  {
    id: 'walmart-plus',
    name: 'Walmart W+',
    description: 'Walmart Plus membership with yellow warnings',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/walmart-plus/semantic.css',
    previewColor: '#fff200',
    inherits: 'wcp',
  },
  {
    id: 'sparky',
    name: 'Sparky',
    description: 'Internal tools with dark navy and cyan backgrounds',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/sparky/semantic.css',
    previewColor: '#001e60',
    inherits: 'wcp',
  },
  {
    id: 'members-mark',
    name: 'Member\'s Mark',
    description: 'Private label brand with dark gray and beige',
    primitiveCSS: '/styles/themes/base/primitive.css',
    semanticCSS: '/styles/themes/members-mark/semantic.css',
    previewColor: '#283645',
    inherits: 'sams-club',
  },
];

export const DEFAULT_THEME: Theme['id'] = 'walmart';

/**
 * Get theme by ID
 */
export function getThemeById(id: string): Theme | undefined {
  return AVAILABLE_THEMES.find(theme => theme.id === id);
}

/**
 * Validate theme ID
 */
export function isValidThemeId(id: string): id is Theme['id'] {
  return AVAILABLE_THEMES.some(theme => theme.id === id);
}

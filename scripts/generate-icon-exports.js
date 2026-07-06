#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../client/components/icons');

// Get all TSX files except index.tsx
const iconFiles = fs.readdirSync(iconsDir)
  .filter(file => file.endsWith('.tsx') && file !== 'index.tsx')
  .map(file => file.replace('.tsx', ''))
  .sort();

console.log(`Found ${iconFiles.length} icon components`);

// Check which ones use default exports vs named exports
const defaultExports = [];
const namedExports = [];

iconFiles.forEach(iconName => {
  const filePath = path.join(iconsDir, `${iconName}.tsx`);
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('export default')) {
    defaultExports.push(iconName);
  } else if (content.includes(`export const ${iconName}`)) {
    namedExports.push(iconName);
  } else {
    console.log(`⚠️  Unknown export type for ${iconName}`);
  }
});

console.log(`\n📊 Export Statistics:`);
console.log(`   Named exports: ${namedExports.length}`);
console.log(`   Default exports: ${defaultExports.length}`);

// Generate index.tsx content
let indexContent = `import { SVGProps } from 'react';\n\n`;

// Add comment sections
indexContent += `// ============================================\n`;
indexContent += `// LIVING DESIGN 3.5 ICON LIBRARY\n`;
indexContent += `// ============================================\n`;
indexContent += `// This file exports all ${iconFiles.length} icon components\n`;
indexContent += `// All icons use currentColor for semantic theming\n`;
indexContent += `//\n`;
indexContent += `// Usage:\n`;
indexContent += `//   import { Search, Settings, Home } from '@/components/icons';\n`;
indexContent += `//   <Search className="text-blue-600" />\n`;
indexContent += `//   <Settings style={{ color: 'var(--ld-semantic-color-text-brand)' }} />\n`;
indexContent += `// ============================================\n\n`;

// Named exports
if (namedExports.length > 0) {
  indexContent += `// Named Exports (${namedExports.length} icons)\n`;
  namedExports.forEach(name => {
    indexContent += `export { ${name} } from './${name}';\n`;
  });
  indexContent += `\n`;
}

// Default exports
if (defaultExports.length > 0) {
  indexContent += `// Default Exports (${defaultExports.length} icons)\n`;
  defaultExports.forEach(name => {
    indexContent += `export { default as ${name} } from './${name}';\n`;
  });
}

// Write the index.tsx file
const indexPath = path.join(iconsDir, 'index.tsx');
fs.writeFileSync(indexPath, indexContent, 'utf8');

console.log(`\n✅ Generated index.tsx with ${iconFiles.length} exports`);
console.log(`📝 File: client/components/icons/index.tsx`);

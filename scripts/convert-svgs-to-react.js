#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, '../client/components/icons');

// Get all SVG files
const svgFiles = fs.readdirSync(iconsDir)
  .filter(file => file.endsWith('.svg'))
  .sort();

console.log(`Found ${svgFiles.length} SVG files to convert`);

// Helper to convert kebab-case or camelCase filename to PascalCase component name
function toPascalCase(filename) {
  const name = filename.replace('.svg', '');
  
  // Handle kebab-case (arrow-left -> ArrowLeft)
  if (name.includes('-')) {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
  
  // Handle camelCase (arrowLeft -> ArrowLeft)
  return name.charAt(0).toUpperCase() + name.slice(1);
}

let convertedCount = 0;
const exports = [];

svgFiles.forEach(file => {
  const componentName = toPascalCase(file);
  const tsxPath = path.join(iconsDir, `${componentName}.tsx`);
  
  // Skip if TSX file already exists
  if (fs.existsSync(tsxPath)) {
    console.log(`⏭️  Skipping ${file} - ${componentName}.tsx already exists`);
    exports.push(componentName);
    return;
  }
  
  const svgPath = path.join(iconsDir, file);
  
  // Read SVG content (may be base64 encoded)
  let svgContent = fs.readFileSync(svgPath, 'utf8');
  
  // Check if base64 encoded
  if (!svgContent.trim().startsWith('<')) {
    // Decode base64
    svgContent = Buffer.from(svgContent, 'base64').toString('utf8');
  }
  
  // Extract SVG attributes and content
  const svgMatch = svgContent.match(/<svg([^>]*)>([\s\S]*)<\/svg>/);
  
  if (!svgMatch) {
    console.log(`⚠️  Could not parse ${file}`);
    return;
  }
  
  const svgAttrs = svgMatch[1];
  const svgInnerContent = svgMatch[2];
  
  // Extract key attributes
  const widthMatch = svgAttrs.match(/width="([^"]*)"/);
  const heightMatch = svgAttrs.match(/height="([^"]*)"/);
  const viewBoxMatch = svgAttrs.match(/viewBox="([^"]*)"/);
  
  const width = widthMatch ? widthMatch[1] : '20';
  const height = heightMatch ? heightMatch[1] : '20';
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : `0 0 ${width} ${height}`;
  
  // Clean up inner content - replace specific colors with currentColor
  let cleanedContent = svgInnerContent
    .replace(/fill="#[0-9A-Fa-f]{6}"/g, 'fill="currentColor"')
    .replace(/fill="#[0-9A-Fa-f]{3}"/g, 'fill="currentColor"')
    .replace(/stroke="#[0-9A-Fa-f]{6}"/g, 'stroke="currentColor"')
    .replace(/stroke="#[0-9A-Fa-f]{3}"/g, 'stroke="currentColor"')
    .trim();
  
  // Create React component
  const componentCode = `import { SVGProps } from 'react';

export const ${componentName} = (props: SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="${width}" 
    height="${height}" 
    viewBox="${viewBox}" 
    fill="none"
    {...props}
  >
    ${cleanedContent}
  </svg>
);
`;
  
  // Write TSX file
  fs.writeFileSync(tsxPath, componentCode, 'utf8');
  console.log(`✅ Converted ${file} -> ${componentName}.tsx`);
  convertedCount++;
  exports.push(componentName);
});

console.log(`\n✨ Converted ${convertedCount} SVG files to React components`);
console.log(`📝 Total exports: ${exports.length}`);
console.log(`\n⚠️  Note: You'll need to manually add these exports to client/components/icons/index.tsx`);

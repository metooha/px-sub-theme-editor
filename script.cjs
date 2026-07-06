const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function toKebabCase(str) {
  return str
    .replace(/^RULE_/, '')
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function processFrontMatter(content, fileName, isSkill) {
  let frontMatter = {};
  let body = content;

  // Extract existing front matter
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (match) {
    const fmStr = match[1];
    body = match[2];
    fmStr.split('\n').forEach(line => {
      const parts = line.split(':');
      if (parts.length >= 2) {
        const key = parts.shift().trim();
        const value = parts.join(':').trim();
        frontMatter[key] = value;
      }
    });
  }

  // Set default description if none
  if (!frontMatter.description) {
    frontMatter.description = `Guidelines and rules for ${fileName.replace(/-/g, ' ')}`;
  }

  if (isSkill) {
    // If title exists, make it name
    if (frontMatter.title) {
      frontMatter.name = frontMatter.title;
      delete frontMatter.title;
    }
    // If no name, use filename
    if (!frontMatter.name) {
      frontMatter.name = fileName;
    }
    
    return `---
name: ${frontMatter.name}
description: ${frontMatter.description}
---
${body.trim()}`;
  } else {
    // Remove title if any
    delete frontMatter.title;
    delete frontMatter.name;
    
    return `---
description: ${frontMatter.description}
alwaysApply: false
---
${body.trim()}`;
  }
}

// 1. Process .builder/rules
const builderRulesDir = path.join(__dirname, '.builder', 'rules');
const files = fs.readdirSync(builderRulesDir);

files.forEach(file => {
  if (file === 'RULES_INDEX.mdc') return; // already removed
  
  const ext = path.extname(file);
  if (ext !== '.mdc' && ext !== '.md') return;
  
  const baseName = path.basename(file, ext);
  
  // Check if it's a skill
  const isSkill = baseName.startsWith('build-') || baseName.startsWith('implement-');
  
  const oldPath = path.join(builderRulesDir, file);
  const content = fs.readFileSync(oldPath, 'utf8');
  
  if (isSkill) {
    const skillName = toKebabCase(baseName);
    const skillDir = path.join(__dirname, '.builder', 'skills', skillName);
    if (!fs.existsSync(skillDir)) {
      fs.mkdirSync(skillDir, { recursive: true });
    }
    const newPath = path.join(skillDir, 'SKILL.md');
    const newContent = processFrontMatter(content, skillName, true);
    fs.writeFileSync(newPath, newContent);
    fs.unlinkSync(oldPath);
  } else {
    let newBaseName = toKebabCase(baseName);
    const newPath = path.join(builderRulesDir, newBaseName + '.mdc');
    const newContent = processFrontMatter(content, newBaseName, false);
    
    if (oldPath !== newPath) {
      fs.writeFileSync(newPath, newContent);
      fs.unlinkSync(oldPath);
    } else {
      fs.writeFileSync(newPath, newContent);
    }
  }
});

// 2. Process guidelines
function processDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  entries.forEach(entry => {
    if (entry.name === 'skills') {
      // It's the skills folder
      const skillsDir = path.join(dir, entry.name);
      const skillFiles = fs.readdirSync(skillsDir);
      skillFiles.forEach(sf => {
        if (!sf.endsWith('.md')) return;
        const skillBase = path.basename(sf, '.md');
        const skillName = toKebabCase(skillBase);
        const oldPath = path.join(skillsDir, sf);
        const content = fs.readFileSync(oldPath, 'utf8');
        const skillOutDir = path.join(__dirname, '.builder', 'skills', skillName);
        if (!fs.existsSync(skillOutDir)) {
          fs.mkdirSync(skillOutDir, { recursive: true });
        }
        const newPath = path.join(skillOutDir, 'SKILL.md');
        const newContent = processFrontMatter(content, skillName, true);
        fs.writeFileSync(newPath, newContent);
        fs.unlinkSync(oldPath);
      });
      return;
    }
    
    if (entry.isDirectory()) {
      processDir(path.join(dir, entry.name));
    } else if (entry.name.endsWith('.md')) {
      const oldPath = path.join(dir, entry.name);
      let content = fs.readFileSync(oldPath, 'utf8');
      const baseName = path.basename(entry.name, '.md');
      
      let newBaseName = toKebabCase(baseName);
      let newPath = path.join(builderRulesDir, newBaseName + '.mdc');
      
      // Ensure no collision
      let counter = 1;
      while (fs.existsSync(newPath)) {
        newPath = path.join(builderRulesDir, `${newBaseName}-${counter}.mdc`);
        counter++;
      }
      
      const newContent = processFrontMatter(content, path.basename(newPath, '.mdc'), false);
      fs.writeFileSync(newPath, newContent);
      fs.unlinkSync(oldPath);
    }
  });
}

processDir(path.join(__dirname, 'guidelines'));

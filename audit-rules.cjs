const fs = require('fs');
const path = require('path');

const rulesDir = path.join(__dirname, '.builder', 'rules');
const rootFiles = ['AGENTS.md', '.builderrules'];

let findings = [];
let alwaysApplyCount = 0;
let totalLinesAlwaysOn = 0;

function analyzeFile(filePath, isMdc) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n').length;
  const chars = content.length;
  
  let severity = 'Good';
  if (lines > 200 || chars > 6000) severity = 'Critical';
  else if (lines >= 150 || chars >= 5000) severity = 'Warning';
  
  const issues = [];
  let alwaysApply = false;
  
  if (lines > 200) issues.push(`File > 200 lines (${lines} lines)`);
  if (chars > 6000) issues.push(`File > 6000 chars (${chars} chars)`);

  if (isMdc) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) {
      issues.push('Missing frontmatter');
      severity = 'High';
    } else {
      const fm = match[1];
      if (!fm.includes('description:')) {
        issues.push('Missing description in frontmatter');
        if (severity === 'Good') severity = 'High';
      }
      if (fm.includes('alwaysApply: true')) {
        alwaysApply = true;
        alwaysApplyCount++;
        totalLinesAlwaysOn += lines;
      }
      if (!fm.includes('globs:')) {
        // Technically optional but good to note
        // issues.push('Missing globs');
      }
    }
  }

  findings.push({
    file: path.relative(__dirname, filePath),
    lines,
    chars,
    severity,
    issues,
    alwaysApply
  });
}

// 1. Root files
rootFiles.forEach(f => analyzeFile(path.join(__dirname, f), false));

// 2. MDC files
if (fs.existsSync(rulesDir)) {
  const mdcFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith('.mdc'));
  mdcFiles.forEach(f => analyzeFile(path.join(rulesDir, f), true));
}

// Generate report
console.log('## Analysis Workflow Report');
console.log('');
console.log(`**Always Apply Files Count:** ${alwaysApplyCount} (Max 3-5 allowed)`);
console.log(`**Combined Always-On Lines:** ${totalLinesAlwaysOn} (Limit 500 lines)`);
if (alwaysApplyCount > 5) {
  console.log(`**CRITICAL ISSUE**: > 5 alwaysApply files found!`);
}

console.log('');
console.log('### File Findings:');
findings.forEach(f => {
  if (f.issues.length > 0 || f.severity !== 'Good') {
    console.log(`- **${f.file}** [${f.severity}] (${f.lines} lines, ${f.chars} chars)`);
    f.issues.forEach(i => console.log(`  - ${i}`));
  }
});

const cleanFiles = findings.filter(f => f.issues.length === 0 && f.severity === 'Good');
console.log(`\nFound ${cleanFiles.length} files that are within limits and have no structural issues.`);

fs.writeFileSync('audit-report.json', JSON.stringify({ findings, alwaysApplyCount, totalLinesAlwaysOn }, null, 2));

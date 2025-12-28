#!/usr/bin/env node

/**
 * Script to fix ArrowLeftIcon issues in auth forms
 */

const fs = require('fs');
const path = require('path');

const filesToFix = [
  '/Users/home/Projects/nexus-saas-hikari/app/(auth_forms)/signin/page.tsx',
  '/Users/home/Projects/nexus-saas-hikari/app/(auth_forms)/signup/page.tsx'
];

function fixFile(filePath) {
  console.log(`Fixing: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf8');

  // Add import if not present
  if (!content.includes("import { ArrowLeft } from 'lucide-react';")) {
    // Find the last import statement
    const importRegex = /import .* from ['"][^'"]+['"];/g;
    const matches = content.match(importRegex);
    if (matches && matches.length > 0) {
      const lastImport = matches[matches.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const endOfLine = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLine + 1) +
                "import { ArrowLeft } from 'lucide-react';\n" +
                content.slice(endOfLine + 1);
    }
  }

  // Replace ArrowLeftIcon usage with ArrowLeft
  content = content.replace(/<ArrowLeftIcon/g, '<ArrowLeft');

  // Remove the ArrowLeftIcon function definition
  const functionStart = content.indexOf('function ArrowLeftIcon');
  if (functionStart !== -1) {
    // Find the end of the function (closing brace)
    let braceCount = 0;
    let inFunction = false;
    let functionEnd = functionStart;

    for (let i = functionStart; i < content.length; i++) {
      if (content[i] === '{') {
        braceCount++;
        inFunction = true;
      } else if (content[i] === '}') {
        braceCount--;
        if (inFunction && braceCount === 0) {
          functionEnd = i + 1;
          break;
        }
      }
    }

    // Remove the function and clean up extra newlines
    const beforeFunction = content.substring(0, functionStart);
    const afterFunction = content.substring(functionEnd);

    // Remove extra newlines before the function
    const cleanedBefore = beforeFunction.replace(/\n\n+$/, '\n');

    content = cleanedBefore + afterFunction;
  }

  fs.writeFileSync(filePath, content);
  console.log(`  ✓ Fixed: ${filePath}`);
  return true;
}

// Run the script
console.log('Fixing ArrowLeftIcon issues...\n');

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    fixFile(file);
  } else {
    console.log(`  ! File not found: ${file}`);
  }
});

console.log('\n✓ Done fixing ArrowLeftIcon issues');
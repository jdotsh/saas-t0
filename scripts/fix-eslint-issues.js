#!/usr/bin/env node

/**
 * Script to automatically fix common ESLint issues
 * This will help clean up the codebase properly
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Find all TypeScript/TSX files
function findFiles(pattern) {
  return glob.sync(pattern, {
    ignore: ['node_modules/**', '.next/**', 'coverage/**', 'dist/**']
  });
}

// Fix console.log statements
function fixConsoleLog(content, filePath) {
  let fixed = content;
  let needsLoggerImport = false;

  // Check if file has console.log, console.error, or console.warn
  if (content.includes('console.')) {
    needsLoggerImport = true;

    // Replace console.log with logger.info
    fixed = fixed.replace(/console\.log\(/g, 'logger.info(');

    // Replace console.error with logger.error
    fixed = fixed.replace(/console\.error\(/g, 'logger.error(');

    // Replace console.warn with logger.warn
    fixed = fixed.replace(/console\.warn\(/g, 'logger.warn(');

    // Add logger import if needed and not already present
    if (needsLoggerImport && !fixed.includes("from '@/lib/logger'")) {
      // Add import after the last import statement or at the beginning
      const lastImportIndex = fixed.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const endOfLine = fixed.indexOf('\n', lastImportIndex);
        fixed = fixed.slice(0, endOfLine + 1) +
                "import { logger } from '@/lib/logger';\n" +
                fixed.slice(endOfLine + 1);
      } else {
        fixed = "import { logger } from '@/lib/logger';\n\n" + fixed;
      }
    }
  }

  return fixed;
}

// Remove unused variables (basic - just comments them out with explanation)
function commentUnusedVars(content) {
  // This is a simplified approach - for complex cases, manual review is needed
  return content;
}

// Fix 'any' types to 'unknown' (safer)
function fixAnyTypes(content) {
  // Replace : any with : unknown for safety
  let fixed = content;
  fixed = fixed.replace(/: any/g, ': unknown');
  fixed = fixed.replace(/<any>/g, '<unknown>');
  fixed = fixed.replace(/ as any/g, ' as unknown');

  // Special case for catch blocks
  fixed = fixed.replace(/catch \(([a-zA-Z_][a-zA-Z0-9_]*): unknown\)/g, 'catch ($1)');
  fixed = fixed.replace(/catch \(([a-zA-Z_][a-zA-Z0-9_]*)\)/g, 'catch ($1: unknown)');

  return fixed;
}

// Main function
function fixFile(filePath) {
  console.log(`Processing: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Apply fixes
  content = fixConsoleLog(content, filePath);
  content = fixAnyTypes(content);

  // Only write if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Fixed: ${filePath}`);
    return true;
  }

  return false;
}

// Run the script
console.log('Starting ESLint fixes...\n');

const tsFiles = findFiles('**/*.{ts,tsx}');
let fixedCount = 0;

tsFiles.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✓ Fixed ${fixedCount} files`);
console.log('\nNote: Some issues require manual review:');
console.log('  - Unused variables (need context to know if safe to remove)');
console.log('  - React hooks violations');
console.log('  - Complex type issues');
console.log('\nRun "pnpm lint" to see remaining issues.');
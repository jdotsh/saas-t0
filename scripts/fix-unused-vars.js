#!/usr/bin/env node

/**
 * Script to remove unused variables and imports
 * This will clean up the codebase properly
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Common unused imports to remove
const unusedImports = {
  // Components that are imported but not used
  'ChromeIcon': true,
  'GithubIcon': true,
  'signInWithEmail': true,
  'getSubscription': true,
  'iconComponents': true,
  'Button': true,
  'Input': true,
  'X': true,
  'Eclipse': true,
  'BellIcon': true,
  'Share2Icon': true,
  'AnimatedBeamMultipleOutputDemo': true,
  'AnimatedListDemo': true,
  'CrossIcon': true,
  'GitHubLogoIcon': true,
  'Carousel': true,
  'CarouselContent': true,
  'CarouselItem': true,
  'CarouselNext': true,
  'CarouselPrevious': true,
  'useRef': true,
  'Image': true,
  'LineChart': true,
  'Package': true,
  'Package2': true,
  'ShoppingCart': true,
  'Users2': true,
  'Inbox': true,
  'BreadcrumbPage': true,
  'useState': true,
  'useEffect': true,
  'RootToggle': true,
  'Icons': true,
  'Suspense': true,
  'TailwindIndicator': true,
  'AnimatePresence': true,
  'Avatar': true,
  'AvatarImage': true,
  'AvatarFallback': true,
  'User': true,
  'RefObject': true,
};

function removeUnusedImports(content) {
  let fixed = content;

  // Find and remove unused imports
  const importRegex = /import\s+(?:{([^}]+)}|([^{}\s]+))\s+from\s+['"][^'"]+['"]/g;
  const singleImportRegex = /import\s+(['"][^'"]+['"])/g;

  // Process named imports
  fixed = fixed.replace(importRegex, (match, namedImports, defaultImport) => {
    if (namedImports) {
      // Process named imports
      const imports = namedImports.split(',').map(i => i.trim());
      const usedImports = imports.filter(imp => {
        const name = imp.split(' as ')[0].trim();
        // Check if this import is in our unused list
        if (unusedImports[name]) {
          // Double-check it's not used in the file
          const restOfFile = content.substring(content.indexOf(match) + match.length);
          const isUsed = new RegExp(`\\b${name}\\b`).test(restOfFile);
          return isUsed;
        }
        return true;
      });

      if (usedImports.length === 0) {
        return ''; // Remove entire import statement
      } else if (usedImports.length < imports.length) {
        // Some imports removed
        return match.replace(namedImports, usedImports.join(', '));
      }
    } else if (defaultImport && unusedImports[defaultImport]) {
      // Check if default import is used
      const restOfFile = content.substring(content.indexOf(match) + match.length);
      const isUsed = new RegExp(`\\b${defaultImport}\\b`).test(restOfFile);
      if (!isUsed) {
        return ''; // Remove entire import statement
      }
    }
    return match;
  });

  // Clean up empty lines from removed imports
  fixed = fixed.replace(/\n\n+/g, '\n\n');

  return fixed;
}

function removeUnusedVariables(content) {
  let fixed = content;

  // Common patterns of unused variables
  const unusedVarPatterns = [
    { pattern: /const\s+currentQuote\s*=\s*[^;]+;/, name: 'currentQuote' },
    { pattern: /const\s+intervals\s*=\s*[^;]+;/, name: 'intervals' },
    { pattern: /const\s+priceIdLoading\s*=\s*[^;]+;/, name: 'priceIdLoading' },
    { pattern: /const\s+userDetails\s*=\s*[^;]+;/, name: 'userDetails' },
    { pattern: /const\s+searchParams\s*=\s*[^;]+;/, name: 'searchParams' },
    { pattern: /const\s+subscriptionId\s*=\s*[^;]+;/, name: 'subscriptionId' },
    { pattern: /const\s+customerId\s*=\s*[^;]+;/, name: 'customerId' },
    { pattern: /let\s+entry\s*=\s*[^;]+;/, name: 'entry' },
  ];

  unusedVarPatterns.forEach(({ pattern, name }) => {
    // Check if variable is actually used after declaration
    const matches = fixed.match(pattern);
    if (matches) {
      const afterDeclaration = fixed.substring(fixed.indexOf(matches[0]) + matches[0].length);
      const isUsed = new RegExp(`\\b${name}\\b`).test(afterDeclaration);
      if (!isUsed) {
        fixed = fixed.replace(pattern, `// Removed unused: ${name}`);
      }
    }
  });

  return fixed;
}

function fixFile(filePath) {
  if (!filePath.includes('.tsx') && !filePath.includes('.ts')) return false;
  if (filePath.includes('node_modules') || filePath.includes('.next')) return false;

  console.log(`Processing: ${filePath}`);

  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;

  // Apply fixes
  content = removeUnusedImports(content);
  content = removeUnusedVariables(content);

  // Only write if changes were made
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`  ✓ Cleaned: ${filePath}`);
    return true;
  }

  return false;
}

// Run the script
console.log('Removing unused variables and imports...\n');

const tsFiles = glob.sync('**/*.{ts,tsx}', {
  ignore: ['node_modules/**', '.next/**', 'coverage/**']
});

let fixedCount = 0;
tsFiles.forEach(file => {
  if (fixFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✓ Cleaned ${fixedCount} files`);
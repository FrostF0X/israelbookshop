const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const COVERAGE_DIR = path.join(__dirname, '..', 'coverage-data');

// Utility to merge overlapping ranges
function mergeRanges(ranges) {
  if (!ranges || ranges.length === 0) return [];
  ranges.sort((a, b) => a.start - b.start);
  const merged = [Object.assign({}, ranges[0])];
  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    if (ranges[i].start <= last.end) {
      last.end = Math.max(last.end, ranges[i].end);
    } else {
      merged.push(Object.assign({}, ranges[i]));
    }
  }
  return merged;
}

async function optimizeCSS() {
  console.log('--- Optimizing CSS ---');
  let originalCssText = '';
  let allRanges = [];

  const files = fs.readdirSync(COVERAGE_DIR).filter(f => f.startsWith('css_coverage_') && f.endsWith('.json'));
  if (files.length === 0) {
    console.log('No CSS coverage files found.');
    return;
  }

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(COVERAGE_DIR, file), 'utf-8'));
    for (const entry of data) {
      if (!originalCssText && entry.text) {
        originalCssText = entry.text;
      }
      if (entry.ranges) {
        allRanges.push(...entry.ranges);
      }
    }
  }

  if (!originalCssText) {
    console.log('Could not find original CSS text in coverage files.');
    return;
  }

  const mergedRanges = mergeRanges(allRanges);
  console.log(`Original CSS Size: ${originalCssText.length} bytes`);
  console.log('Parsing CSS into AST with PostCSS...');
  
  const root = postcss.parse(originalCssText);
  let removedRules = 0;
  let keptRules = 0;

  root.walkRules(rule => {
    // Keep pseudo-classes and dynamic JS states unconditionally
    if (
      rule.selector.includes(':') ||
      rule.selector.includes('.is-') ||
      rule.selector.includes('.has-') ||
      rule.selector.includes('.js-') ||
      rule.selector.includes('.slick-') ||
      rule.selector.includes('product-form')
    ) {
      keptRules++;
      return;
    }

    const ruleStart = rule.source.start.offset;
    const ruleEnd = rule.source.end.offset;

    let isUsed = false;
    for (const range of mergedRanges) {
      if (ruleStart <= range.end && ruleEnd >= range.start) {
        isUsed = true;
        break;
      }
    }

    if (!isUsed) {
      rule.remove();
      removedRules++;
    } else {
      keptRules++;
    }
  });

  root.walkAtRules(atRule => {
    if (atRule.nodes && atRule.nodes.length === 0) {
      atRule.remove();
    }
  });

  const finalCss = root.toString();
  console.log(`AST Pruning Complete: Removed ${removedRules} rules, Kept ${keptRules} rules.`);
  console.log(`Final Optimized Size: ${finalCss.length} bytes`);

  const destLiquid = path.join(__dirname, '..', 'assets', 'theme.css.liquid');
  const destCss = path.join(__dirname, '..', 'assets', 'theme.css');
  fs.writeFileSync(destLiquid, finalCss);
  fs.writeFileSync(destCss, finalCss);
  console.log(`Saved optimized CSS to ${destLiquid} and ${destCss}`);
}

async function optimizeJS() {
  console.log('--- Optimizing JS ---');
  let allRanges = [];

  const files = fs.readdirSync(COVERAGE_DIR).filter(f => f.startsWith('js_coverage_') && f.endsWith('.json'));
  if (files.length === 0) {
    console.log('No JS coverage files found.');
    return;
  }

  for (const file of files) {
    const data = JSON.parse(fs.readFileSync(path.join(COVERAGE_DIR, file), 'utf-8'));
    // The data might be an array or single object
    const entries = Array.isArray(data) ? data : [data];
    for (const entry of entries) {
      if (entry.ranges) {
        allRanges.push(...entry.ranges);
      }
    }
  }

  const mergedRanges = mergeRanges(allRanges);
  const codeFile = path.join(__dirname, '..', 'assets', 'empire.js');
  if (!fs.existsSync(codeFile)) {
    console.log(`Cannot find ${codeFile}`);
    return;
  }

  const code = fs.readFileSync(codeFile, 'utf-8');
  
  function isNodeUnused(nodeStart, nodeEnd) {
    return !mergedRanges.some(range =>
        Math.max(nodeStart, range.start) < Math.min(nodeEnd, range.end)
    );
  }

  console.log('Parsing AST...');
  const ast = parser.parse(code, { sourceType: 'script' });

  let removedNodes = 0;
  let removedBytes = 0;

  console.log('Traversing AST...');
  traverse(ast, {
    enter(path) {
      const { node } = path;
      if (!node || node.start === undefined || node.end === undefined) return;

      const isSafeToRemove =
        path.isFunctionDeclaration() ||
        path.isClassDeclaration() ||
        (path.isVariableDeclaration() && path.parentPath.isProgram()) ||
        (path.isObjectProperty() && path.node.value && (path.node.value.type === 'FunctionExpression' || path.node.value.type === 'ArrowFunctionExpression')); 

      if (isSafeToRemove) {
        // Protect webpack internals
        const protectPatterns = [
          /^__webpack_/,
          /createCommonjsModule/i,
          /unwrapExports/i,
          /getDefaultExport/i,
          /^commonjsGlobal$/i
        ];

        let shouldProtect = false;
        if (node.id && node.id.name) {
          shouldProtect = protectPatterns.some(p => p.test(node.id.name));
        } else if (node.declarations) {
          shouldProtect = node.declarations.some(d => d.id && d.id.name && protectPatterns.some(p => p.test(d.id.name)));
        }

        if (shouldProtect) {
          return;
        }

        if (isNodeUnused(node.start, node.end)) {
          removedBytes += (node.end - node.start);
          removedNodes++;
          
          if (path.isObjectProperty() && path.node.value && (path.node.value.type === 'FunctionExpression' || path.node.value.type === 'ArrowFunctionExpression')) {
             path.get('value').replaceWith(parser.parseExpression('function(){}'));
          } else {
             path.remove();
          }
        }
      }
    }
  });

  console.log(`Pruned ${removedNodes} nodes, saving approx ${removedBytes} bytes.`);
  console.log('Generating optimized code...');
  
  const output = generate(ast, {
    retainLines: false,
    compact: true,
  }, code);

  fs.writeFileSync(codeFile, output.code);
  const minFile = path.join(__dirname, '..', 'assets', 'empire.min.js');
  fs.writeFileSync(minFile, output.code);
  
  console.log(`Saved optimized JS to ${codeFile} and ${minFile}`);
}

async function main() {
  await optimizeCSS();
  await optimizeJS();
}

main().catch(console.error);

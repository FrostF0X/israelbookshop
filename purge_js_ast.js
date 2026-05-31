const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const codeFile = 'assets/empire.js';
const code = fs.readFileSync(codeFile, 'utf-8');
const coverageData = JSON.parse(fs.readFileSync('empire_coverage.json', 'utf-8'));

// Puppeteer's coverage ranges are the EXECUTED ranges.
const executedRanges = coverageData.ranges;

function isNodeUnused(nodeStart, nodeEnd) {
    // A node is unused if it does NOT overlap with ANY executed range.
    // Overlap condition: max(start1, start2) < min(end1, end2)
    const isUsed = executedRanges.some(range => 
        Math.max(nodeStart, range.start) < Math.min(nodeEnd, range.end)
    );
    return !isUsed;
}

console.log('Parsing AST...');
const ast = parser.parse(code, {
    sourceType: 'script', // or module, but typical minified bundles parse as script
});

let removedNodes = 0;
let removedBytes = 0;

console.log('Traversing AST...');
traverse(ast, {
    enter(path) {
        const { node } = path;
        
        // Safety check: Don't remove nodes that are already removed or missing bounds
        if (!node || node.start === undefined || node.end === undefined) return;

        // Determine if it's a safe structural node to remove
        const isSafeToRemove = 
            path.isFunctionDeclaration() || 
            path.isClassDeclaration() || 
            (path.isVariableDeclaration() && path.parentPath.isProgram()) || // Only top-level variable declarations
            path.isObjectProperty(); // This will aggressively prune unused Webpack modules inside __webpack_modules__

        if (isSafeToRemove) {
            if (isNodeUnused(node.start, node.end)) {
                removedBytes += (node.end - node.start);
                removedNodes++;
                path.remove();
            }
        }
    }
});

console.log(`Pruned ${removedNodes} nodes, saving approx ${removedBytes} bytes from AST.`);

console.log('Generating optimized code...');
const output = generate(ast, {
    retainLines: false,
    compact: true,
}, code);

fs.writeFileSync('assets/empire.js', output.code);
fs.writeFileSync('assets/empire.min.js', output.code); // Replace both just in case

console.log('Optimization complete. Saved to assets/empire.js');

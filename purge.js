const { PurgeCSS } = require('purgecss');
const fs = require('fs');

async function run() {
  const purgeCSSResult = await new PurgeCSS().purge({
    content: [
      'layout/**/*.liquid',
      'templates/**/*.liquid',
      'templates/customers/**/*.liquid',
      'sections/**/*.liquid',
      'snippets/**/*.liquid'
    ],
    css: ['assets/theme.css.liquid'],
    safelist: {
      standard: [
        /^is-/,
        /^has-/,
        /^js-/,
        /^slick-/,
        /^searchanise-/,
        /^snize-/,
        /^spr-/,
        /^jdgm-/,
        /^shopify-/,
        /active/,
        /focus/,
        /hover/
      ],
      deep: [/^searchanise-/, /^snize-/],
      greedy: [/^is-/, /^has-/, /^js-/, /^slick-/]
    }
  });

  const originalCss = fs.readFileSync('assets/theme.css.liquid', 'utf8');
  const optimizedCss = purgeCSSResult[0].css;
  
  console.log(`Original CSS Size: ${originalCss.length} bytes`);
  console.log(`Optimized CSS Size: ${optimizedCss.length} bytes`);
  
  const savings = ((originalCss.length - optimizedCss.length) / originalCss.length * 100).toFixed(2);
  console.log(`PurgeCSS Savings: ${savings}%`);

  fs.writeFileSync('assets/theme.css.liquid', optimizedCss);
  console.log('Overwrote assets/theme.css.liquid successfully!');
}

run().catch(console.error);

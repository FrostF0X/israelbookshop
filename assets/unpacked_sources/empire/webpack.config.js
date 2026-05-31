const path = require('path');
const aliases = require('./aliases.json');

const exactAliases = {};
for (const [key, value] of Object.entries(aliases)) {
  exactAliases[key + '$'] = value;
}

// Map missing deps to empty module if dead
exactAliases['scroll-lock$'] = path.resolve(__dirname, 'empty.js');
exactAliases['isbot$'] = path.resolve(__dirname, 'empty.js');

// Fix flickity internal deps
exactAliases['fizzy-ui-utils/utils$'] = path.resolve(__dirname, 'node_modules/fizzy-ui-utils/utils.js');
exactAliases['get-size/get-size$'] = path.resolve(__dirname, 'node_modules/get-size/get-size.js');
exactAliases['ev-emitter/ev-emitter$'] = path.resolve(__dirname, 'node_modules/ev-emitter/ev-emitter.js');
exactAliases['unidragger/unidragger$'] = path.resolve(__dirname, 'node_modules/unidragger/unidragger.js');
exactAliases['unipointer/unipointer$'] = path.resolve(__dirname, 'node_modules/unipointer/unipointer.js');

// Fix material ripple
exactAliases['@material/ripple/index.js$'] = path.resolve(__dirname, 'node_modules/@material/ripple/component.js');

module.exports = {
  entry: './source/scripts/Empire.js',
  output: {
    filename: 'main.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../../'),
  },
  mode: 'production',
  resolve: {
    alias: exactAliases,
    extensions: ['.js', '.es.js', '.json'],
  },
  optimization: {
    minimize: true
  }
};

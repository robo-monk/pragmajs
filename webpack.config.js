const path = require('path');
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  mode: "production",
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: { 
      type: "umd",
      name: "pragmajs"
    },
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },

  optimization: {
    minimize:true,
    minimizer: [new TerserPlugin()]
  },

  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
        type: "javascript/auto"
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },

  devtool: 'source-map'
};

// Exports

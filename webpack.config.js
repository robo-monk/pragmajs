const path = require('path');
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  mode: "production",
  target: 'web',
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'pragmajs',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },

  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          options: {
            presets: ['@babel/preset-env']
          },
          loader: 'babel-loader'
        },
        type: "javascript/auto",
        
      }
    ]
  },
  //devtool: 'source-map'
};

// Exports

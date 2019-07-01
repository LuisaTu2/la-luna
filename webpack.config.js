const path = require('path');

module.exports = {
  entry: './client/src/',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          
        }
      }
    ]
  }
};
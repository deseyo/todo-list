const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = { 
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      inject: 'head',
      scriptLoading: 'defer'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpge|gif)$/i,
        type: 'asset/resource'
      }
    ]
  }
}
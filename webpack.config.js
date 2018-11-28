const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode:'development',
  stats: {
      colors: true
  },
  devtool: 'source-map',
  entry: './src/index.js',          
  output: {                 
    path: path.resolve(__dirname,'dist'),          
    filename: 'js/app.bundle.js', 
  }, 
  plugins:  [
      new CopyWebpackPlugin([ 
            { from: 'src/index.html' },
            // { from: 'src/static/icons' , to: 'static/icons'},
            // { from: 'src/static/data' , to: 'static/data'}
        ]),
  ], 
  module: {
    rules: [
      { 
        test:/\.js$/,
        exclude: /node_modules/ ,
        use: [{loader: 'babel-loader'}]
      },
      { test: /\.css/,use: ['style-loader', 'css-loader'] },
      // { test:/\.css$/, use: ['style-loader','css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'] },
     
      // {
      //   test: /\.css$/,
      //   use: [
      //           MiniCssExtractPlugin.loader,
      //           "css-loader"
      //         ]
      //   }
    ]
  },
  devServer: {
    contentBase: './',
    compress: true,
    port: 3030,
    stats:"minimal",
    // open:true
  }
};
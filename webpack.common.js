const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  // Specify where the root of the application lies.
  entry: './src/index.tsx',

  // Where files should be sent once they are bundled
 output: {
   path: path.join(__dirname, '/dist'),
   filename: 'index.bundle.js'
 },
  // webpack 5 comes with devServer which loads in development mode
 devServer: {
   port: 3000,
   /**
    * You can read about all the options (including specifying URL, port, etc)
    * here: https://webpack.js.org/configuration/dev-server/#devserveropen
    */
   open: {
     app: {
       name: 'chrome' // Platform-specific (macOS: 'Google Chrome', Linux: 'google-chrome')
     }
   }
 },
  // Rules of how webpack will take our files, complie & bundle them for the browser 
 module: {
   rules: [
     {
       test: /\.(t|j)sx?$/,
       use: {
         loader: 'ts-loader' 
       }
     },
     {
      enforce: 'pre',
      test: /\.js$/,
      loader: 'source-map-loader'
    },
     {
       test: /\.scss$/,
       use: ['style-loader', 'css-loader', 'sass-loader']
     }
   ]
 },
 resolve: {
    extensions: ['.tsx', '.js'],
  },
 plugins: [new HtmlWebpackPlugin({ template: './deploy/index.html' })],
}
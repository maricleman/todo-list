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
    { test: /\.scss$/, use: [ 
      { loader: "style-loader" },  // to inject the result into the DOM as a style block
      { loader: "css-modules-typescript-loader"},  // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
      { loader: "css-loader", options: { modules: true } },  // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
      { loader: "sass-loader" },  // to convert SASS to CSS
      // NOTE: The first build after adding/removing/renaming CSS classes fails, since the newly generated .d.ts typescript module is picked up only later
      ] 
    },
   ]
 },
 resolve: {
    extensions: ['.tsx', '.js', '.scss'],
  },
 plugins: [new HtmlWebpackPlugin({ template: './deploy/index.html' })]
}
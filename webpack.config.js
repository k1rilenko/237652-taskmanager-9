const path = require(`path`);
const baseContent = path.join(__dirname, `public`);
module.exports = {
  mode: `development`,
  entry: `./src/main.js`,
  output: {
    filename: `bundle.js`,
    path: baseContent
  },
  devtool: `source-map`,
  devServer: {
    contentBase: baseContent,
    publicPath: `http://localhost:8080/`,
    compress: true,
    watchContentBase: true
  }
};

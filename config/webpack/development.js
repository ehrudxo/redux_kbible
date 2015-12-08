import webpack from 'webpack';

module.exports = {
  devtool : 'inline-source-map',
  watch : true,
  plugins : [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEVTOOLS__ : true,
      __DEVELOPMENT__ : true
    })
  ]
}

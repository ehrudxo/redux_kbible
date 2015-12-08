import webpack from 'webpack';

export default function(env = null){
  return Object.assign({},{
    entry : {
      application : './src/js/main.js'
    },
    output : {
      filename : 'main.js'
    },
    module : {
      loaders :[
        {
          test : /\.js$/,
          exclude : /node_modules/,
          loader : 'babel-loader'
        }
      ]
    },
    plugins :[
      new webpack.DefinePlugin({
        __DEVTOOLS__ : true,
        __DEVELOPMENT__ : true
      })
    ]
  }, env && require(`./webpack/${env}`));
}

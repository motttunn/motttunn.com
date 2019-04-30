module.exports = {

  mode: 'production',

  entry: {
    'common': './src/assets/js/script.js',
    'index/app': './src/assets/js/index/script.js',
    'news/app': './src/assets/js/news/script.js',
    'portfolio/app': './src/assets/js/portfolio/script.js',
    '404/app': './src/assets/js/404/script.js',
  },

  output: {
    path: `${__dirname}/`,
    filename: '[name].bundle.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          },
        ],
        exclude: /node_modules/
      }
    ]
  },
  
  // module: {
  //   rules: [
  //     {
  //       test: /\.ts$/,
  //       use: [
  //         {
  //           loader: 'babel-loader'
  //         },
  //         {
  //           loader: 'ts-loader'
  //         },
  //         {
  //           loader: 'tslint-loader',
  //           options: {
  //             typeCheck: true,
  //             fix: false,
  //             emitErrors: true
  //           },
  //         },
  //       ],
  //       exclude: /node_modules/
  //     }
  //   ]
  // },

  cache: false

};

module.exports = {

  mode: 'development',

  // entry: './src/assets/js/main.js',
  entry: './src/assets/ts/script.ts',

  output: {
    // filename: 'javascript.bundle.js'
    filename: 'script.js'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  // module: {
  //   rules: [
  //     {
  //       test: /\.ts$/,
  //       use: [
  //         {
  //           loader: 'babel-loader'
  //         },
  //       ],
  //       exclude: /node_modules/
  //     }
  //   ]
  // },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          },
          {
            loader: 'tslint-loader',
            options: {
              typeCheck: true,
              fix: false,
              emitErrors: true
            },
          },
        ],
        exclude: /node_modules/
      }
    ]
  },

};

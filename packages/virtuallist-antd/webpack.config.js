const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/index.tsx'),
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.js', '.ts', '.jsx']
  },
  externals: {    //避免打包
    'react': {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'lodash': {
      commonjs: 'lodash',
      commonjs2: 'lodash',
      amd: 'lodash',
      root: '_',
    },
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()],
  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: "ANTD_BASE_MODULE",
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
}
// Node module
import path from 'path';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
// Config
import config from '../config';
import commonWebpackConfig from '../webpack.common';

const {
  isProduction,
  srcPath,
  distPath,
  SERVER_DIST_PATH,
  CLIENT_DIST_PATH
} = config;

const {
  resolve,
  plugins
} = commonWebpackConfig;

const serverBaseWebpackConfig = {
  name: 'server',
  target: 'node',
  node: {
    __dirname: true,
    global: true
  },
  devtool: isProduction ? false : 'eval',
  externals: [nodeExternals()],
  entry: path.join(srcPath, './server'),
  output: {
    path: SERVER_DIST_PATH,
    filename: 'index.js',
    chunkFilename: isProduction ? '[name].[chunkhash:6].js' : '[name].js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]?[loaders]'
  },
  resolve,
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          { loader: require.resolve('ts-loader'), options: { silent: true, transpileOnly: true } }
        ]
      }
    ]
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env.SERVER_DIST_PATH': JSON.stringify(SERVER_DIST_PATH),
      'process.env.CLIENT_DIST_PATH': JSON.stringify(CLIENT_DIST_PATH)
    })
  ]
};

export default serverBaseWebpackConfig;

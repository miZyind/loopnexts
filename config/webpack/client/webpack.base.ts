// Node module
import path from 'path';
import webpack from 'webpack';
import AssetsPlugin from 'assets-webpack-plugin';
// Config
import config from '../config';
import commonWebpackConfig from '../webpack.common';

const {
  isProduction,
  appPath,
  srcPath,
  distPath,
  publicPath,
  tsCompilerOptions,
  CLIENT_DIST_PATH
} = config;

const {
  resolve,
  plugins
} = commonWebpackConfig;

const clientBaseWebpackConfig = {
  name: 'client',
  target: 'web',
  devtool: isProduction ? 'cheap-source-map' : 'eval',
  entry: { client: path.join(srcPath, './client') },
  output: {
    filename: isProduction ? '[name].[hash:6].js' : '[name].js',
    publicPath,
    path: CLIENT_DIST_PATH,
    chunkFilename: isProduction ? '[name].[chunkhash:6].js' : '[name].js',
    crossOriginLoading: 'anonymous'
  },
  performance: { hints: isProduction ? 'warning' : false },
  resolve: {
    modules: resolve.modules,
    extensions: [
      ...resolve.extensions,
      '.css'
    ]
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: { limit: 10000, name: 'assets/[name].[hash:6].[ext]' }
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
        loader: require.resolve('file-loader'),
        options: { limit: 10000, name: 'assets/[name].[hash:6].[ext]' }
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'), options: {
              silent: true,
              transpileOnly: true,
              compilerOptions: { ...tsCompilerOptions, target: 'es6', module: 'esnext' }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...plugins,
    new AssetsPlugin({ path: CLIENT_DIST_PATH })
  ]
};

export default clientBaseWebpackConfig;

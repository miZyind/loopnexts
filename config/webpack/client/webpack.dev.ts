// Node module
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import AutoDllPlugin from 'autodll-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// Config
import config from '../config';
import clientBaseWebpackConfig from './webpack.base';

const { appHtml, polyfills } = config;

const { entry, plugins } = clientBaseWebpackConfig;

const clientDevWebpackConfig = {
  ...clientBaseWebpackConfig,
  entry: [
    entry.client,
    'react-error-overlay',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true'
  ],
  module: {
    ...clientBaseWebpackConfig.module,
    rules: [
      ...clientBaseWebpackConfig.module.rules,
      {
        test: /\.css$/,
        loaders: [
          { loader: require.resolve('style-loader') },
          {
            loader: require.resolve('css-loader'),
            options: { sourceMap: true }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9'
                  ],
                  flexbox: 'no-2009'
                })
              ],
              sourceMap: true
            }
          },
          require.resolve('resolve-url-loader')
        ]
      }
    ]
  },
  plugins: [
    ...plugins,
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({ inject: true, template: appHtml, favicon: 'public/favicon.ico' }),
    new AutoDllPlugin({
      filename: '[name].js',
      entry: { polyfills }
    })
  ]
};

export default clientDevWebpackConfig;

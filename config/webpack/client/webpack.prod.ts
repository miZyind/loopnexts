// Node module
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import CompressionPlugin from 'compression-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
// Config
import paths from '../paths';
import baseConfig from './webpack.base';

const prodConfig: webpack.Configuration = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: paths.build,
    filename: 'assets/js/[name].[hash:6].js'
  },
  module: {
    rules: [
      ...baseConfig.module!.rules,
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: 'file-loader?name=/assets/images/[name].[hash:6].[ext]'
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
        use: 'file-loader?name=/assets/fonts/[name].[hash:6].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1, minimize: true } },
            {
              loader: 'postcss-loader',
              options: {
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
                ]
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    ...baseConfig.plugins!,
    new ProgressBarPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[hash:6].css',
      allChunks: true
    }),
    new CompressionPlugin()
  ],
  optimization: {
    runtimeChunk: true,
    splitChunks: {
      chunks: 'all'
    }
  }
};

export default prodConfig;

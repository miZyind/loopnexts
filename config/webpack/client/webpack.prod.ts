// Node module
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
// Config
import paths from '../paths';
import baseConfig from './webpack.base';

const prodConfig: webpack.Configuration = {
  ...baseConfig,
  mode: 'production',
  output: {
    path: paths.dist,
    filename: 'assets/js/[name].[hash:6].js'
  },
  module: {
    rules: [
      ...baseConfig.module!.rules,
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
    new webpack.ProgressPlugin(),
    new ExtractTextPlugin({
      filename: 'assets/css/[name].[hash:6].css',
      allChunks: true
    })
  ]
};

export default prodConfig;

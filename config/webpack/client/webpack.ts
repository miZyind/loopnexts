// Node module
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// Config
import paths from '../paths';

const config: webpack.Configuration = {
  stats: 'minimal',
  target: 'web',
  entry: [
    paths.client
  ],
  output: {
    path: paths.dist,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader?silent=true&transpileOnly=true'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
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
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
        use: 'url-loader?limit=4096&name=assets/[name].[hash:6].[ext]'
      },
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)$/i,
        use: 'file-loader?limit=100000&name=assets/[name].[hash:6].[ext]'
      },
    ]
  },
  optimization: {
    minimize: true,
    namedChunks: true,
    noEmitOnErrors: true,
    namedModules: true,
    concatenateModules: true
    // splitChunks: {
    //   name: true,
    //   chunks: 'all',
    //   minChunks: 2
    // }
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      // title: '123',
      template: paths.template,
      favicon: 'public/favicon.ico',
      minify: {
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeComments: true,
        useShortDoctype: true,
        keepClosingSlash: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ]
};

export default config;

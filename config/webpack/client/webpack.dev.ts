// Node module
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
// Config
import baseConfig from './webpack.base';

const devConfig: webpack.Configuration = {
  ...baseConfig,
  mode: 'development',
  module: {
    rules: [
      ...baseConfig.module!.rules,
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: require.resolve('postcss-loader'),
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
              ],
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
};

export default devConfig;

// Node module
import webpack from 'webpack';
import OptimizeJsPlugin from 'optimize-js-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// Config
import config from '../config';
import serverBaseWebpackConfig from './webpack.base';

const { ANALYZE_BUNDLE } = config;

const { plugins } = serverBaseWebpackConfig;

const analyzePlugins = ANALYZE_BUNDLE
  ? [new BundleAnalyzerPlugin({ analyzerMode: 'static', reportFilename: 'server-report.html' })]
  : [];

const serverProdWebpackConfig = {
  ...serverBaseWebpackConfig,
  plugins: [
    ...plugins,
    ...analyzePlugins,
    new webpack.ProgressPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: { ecma: 8, drop_console: true },
        output: { ecma: 8, comments: false }
      }
    }),
    new OptimizeJsPlugin()
  ]
};

export default serverProdWebpackConfig;

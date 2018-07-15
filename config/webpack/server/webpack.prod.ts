// Node module
import webpack from 'webpack';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
// Config
import baseConfig from './webpack.base';

const prodConfig: webpack.Configuration = {
  ...baseConfig,
  mode: 'production',
  plugins: [
    ...baseConfig.plugins!,
    new ProgressBarPlugin()
  ]
};

export default prodConfig;

// Node module
import webpack from 'webpack';
// Config
import baseConfig from './webpack.base';

const prodConfig: webpack.Configuration = {
  ...baseConfig,
  mode: 'production',
  plugins: [
    ...baseConfig.plugins!,
    new webpack.ProgressPlugin()
  ]
};

export default prodConfig;

// Node module
import webpack from 'webpack';
// Config
import baseConfig from './webpack.base';

const devConfig: webpack.Configuration = {
  ...baseConfig,
  mode: 'development',
};

export default devConfig;

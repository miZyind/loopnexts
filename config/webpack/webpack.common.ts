// Node module
import path from 'path';
import webpack from 'webpack';
// Config
import config from './config';

const {
  nodePath,
  appNodeModulesPath,
  VERSION,
  NODE_ENV
} = config;

const commonWebpackConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    modules: ['node_modules', appNodeModulesPath].concat(nodePath.split(path.delimiter).filter(Boolean))
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(VERSION),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    })
  ]
};

export default commonWebpackConfig;

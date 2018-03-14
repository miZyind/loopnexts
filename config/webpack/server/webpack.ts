// Node module
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
// Config
import paths from '../paths';

const config: webpack.Configuration = {
  stats: 'minimal',
  target: 'node',
  entry: paths.server,
  output: {
    path: paths.dist,
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader?silent=true&transpileOnly=true'
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin()
  ],
  externals: [nodeExternals()]
};

export default config;

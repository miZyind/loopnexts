// Node module
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
// Config
import env from '../env';
import paths from '../paths';

const baseConfig: webpack.Configuration = {
  stats: 'minimal',
  target: 'node',
  entry: paths.server,
  output: {
    path: paths.dist,
    filename: 'index.js'
  },
  resolve: {
    alias: {
      '#lib': paths.resolveApp('src/lib')
    },
    modules: ['node_modules', paths.nodeModules],
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
    new webpack.DefinePlugin({
      'process.env.APP_NAME': JSON.stringify(env.appName),
      'process.env.APP_VERSION': JSON.stringify(env.appVersion),
      'process.env.APP_DIST': JSON.stringify(paths.dist),
      'process.env.APP_PORT': JSON.stringify(env.appPort)
    })
  ],
  externals: [nodeExternals()]
};

export default baseConfig;

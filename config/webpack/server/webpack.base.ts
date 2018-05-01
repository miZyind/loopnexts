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
        use: {
          loader: 'ts-loader',
          options: {
            silent: true,
            transpileOnly: true,
            compilerOptions: { module: 'esnext' }
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.APP_NAME': JSON.stringify(env.name),
      'process.env.APP_VERSION': JSON.stringify(env.version),
      'process.env.APP_PROTOCOL': JSON.stringify(env.connection.protocol),
      'process.env.APP_HOST': JSON.stringify(env.connection.host),
      'process.env.APP_PORT': JSON.stringify(env.connection.port),
      'process.env.APP_PATH': JSON.stringify(env.connection.path),
      'process.env.APP_DIST': JSON.stringify(paths.dist)
    })
  ],
  externals: [nodeExternals()]
};

export default baseConfig;

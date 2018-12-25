// Dotenv
import 'dotenv/config';
// Node module
import path from 'path';
import withCSS from '@zeit/next-css';
import WithTypescript from '@zeit/next-typescript';
import withOptimizedImages from 'next-optimized-images';
// Definition
import { ServerOptions } from 'next-server';

const isDev = process.env.NODE_ENV !== 'production';
const {
  APP_NAME: appName,
  APP_VERSION: appVersion,
  APP_PROTOCOL: appProtocol,
  APP_HOST: appHost,
  APP_PORT: appPort,
  APP_PATH: appPath,
} = process.env;

console.log(
  'APP_NAME',
  appName,
  'APP_VERSION',
  appVersion,
  'APP_PROTOCOL',
  appProtocol,
  'APP_HOST',
  appHost,
  'APP_PORT',
  appPort,
  'APP_PATH',
  appPath,
);

const serverPath = path.resolve(process.cwd(), 'server');

const nextServerOptions: ServerOptions = {
  dev: isDev,
  dir: path.resolve(process.cwd(), 'client'),
  quiet: true,
  conf: withCSS(
    WithTypescript(
      withOptimizedImages({
        publicRuntimeConfig: { appName, appVersion },
        webpack(config) {
          config.module!.rules.push({
            test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/i,
            use: {
              loader: 'file-loader',
              options: {
                limit: 8192,
                publicPath: './',
                outputPath: 'static/css/',
                name: '[name].[ext]',
              },
            },
          });

          return config;
        },
      }),
    ),
  ),
};

export {
  isDev,
  appName,
  appVersion,
  appProtocol,
  appHost,
  appPort,
  appPath,
  serverPath,
  nextServerOptions,
};

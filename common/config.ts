// Dotenv
import 'dotenv/config';
// Node module
import { resolve } from 'path';
import withCSS from '@zeit/next-css';
import WithTypescript from '@zeit/next-typescript';
import { ApplicationConfig } from '@loopback/core';
// Definition
import { ServerOptions } from 'next-server';

const isDev = process.env.NODE_ENV === 'development';
const resolvePath = (path: string) => resolve(process.cwd(), path);
const folderPaths = {
  assets: resolvePath('assets'),
  client: resolvePath('client'),
  server: resolvePath('server'),
};
const {
  NAME: appName,
  VERSION: appVersion,
  PROTOCOL: protocol,
  HOST: host,
  PORT: port,
  BASE_PATH: basePath,
  BASE_ASSETS_PATH: baseAssetsPath,
} = process.env;
const loopbackConfig: ApplicationConfig = {
  rest: {
    port,
    host,
    protocol,
    basePath,
    openApiSpec: {
      setServersFromRequest: true,
    },
  },
};
const nextConfig: ServerOptions = {
  dev: isDev,
  dir: folderPaths.client,
  quiet: true,
  conf: withCSS(
    WithTypescript({
      assetPrefix: basePath,
      publicRuntimeConfig: { appName, appVersion, basePath, baseAssetsPath },
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
};

export {
  appName,
  appVersion,
  isDev,
  baseAssetsPath,
  folderPaths,
  loopbackConfig,
  nextConfig,
};

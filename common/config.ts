// Dotenv
import 'dotenv/config';
// Node module
import path from 'path';
import withCSS from '@zeit/next-css';
import WithTypescript from '@zeit/next-typescript';
import { ApplicationConfig } from '@loopback/core';
// Definition
import { ServerOptions } from 'next-server';

const isDev = process.env.NODE_ENV === 'development';
const {
  NAME: appName,
  VERSION: appVersion,
  PROTOCOL: protocol,
  HOST: host,
  PORT: port,
  BASE_PATH: basePath,
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
  dir: path.resolve(process.cwd(), 'client'),
  quiet: true,
  conf: withCSS(
    WithTypescript({
      publicRuntimeConfig: { appName, appVersion, basePath },
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

export { appName, appVersion, isDev, loopbackConfig, nextConfig };

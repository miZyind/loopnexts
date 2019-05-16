// Dotenv
import 'dotenv/config';
// Node module
import { resolve } from 'path';
import { ApplicationConfig } from '@loopback/core';
// Next plugin
import fonts from 'next-fonts';
import css from '@zeit/next-css';
import composer from 'next-composer';
import typescript from '@zeit/next-typescript';
import optimizedImages from 'next-optimized-images';
// Definition
import { Configuration } from 'webpack';
import { ServerOptions } from 'next-server';

const isDev = process.env.NODE_ENV === 'development';
const resolvePath = (path: string) => resolve(__dirname, '..', path);
const folderPaths = {
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
  conf: composer([css, fonts, optimizedImages, typescript], {
    assetPrefix: basePath,
    publicRuntimeConfig: { appName, appVersion, basePath, isDev },
    webpack: (config: Configuration) => {
      config!.module!.rules.forEach((rule) => {
        const ruleContainsTs = rule!.test!.toString().includes('ts|tsx');
        if (
          ruleContainsTs &&
          rule.use &&
          typeof rule.use !== 'string' &&
          typeof rule.use !== 'function' &&
          !(rule.use instanceof Array) &&
          typeof rule.use.options !== 'string' &&
          rule.use.loader === 'next-babel-loader'
        ) {
          delete rule.include;
          rule.use.options!.cwd = process.cwd();
        }
      });
      return config;
    },
  }),
};
export { appName, appVersion, isDev, folderPaths, loopbackConfig, nextConfig };

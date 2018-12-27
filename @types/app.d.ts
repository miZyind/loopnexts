// Next plugin
declare module '@zeit/next-css';
declare module '@zeit/next-typescript' {
  import { Configuration } from 'webpack';
  import { NextConfig } from 'next-server/next-config';
  interface Config extends NextConfig {
    webpack: (config: Configuration) => Configuration;
  }
  export default (config: Config) => Configuration;
}

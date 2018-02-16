// Info
import packageInfo from '../../package.json';

const config = {
  port: 3500,
  dist: 'dist',
  version: packageInfo.version,
  isDev: process.env.NODE_ENV === 'development'
};

export default config;

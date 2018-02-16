// Node module
import fs from 'fs';
import path from 'path';
// Version
import packageInfo from '../../package.json';
// TSConfig
import tsconfig from '../../tsconfig.json';

const {
  NODE_ENV,
  NODE_PATH = '',
  ANALYZE_BUNDLE
} = process.env;

const appPath = fs.realpathSync(process.cwd());

const resolveApp = (relativePath: string) => path.resolve(appPath, relativePath);

const distPath = resolveApp('dist');

const CLIENT_DIST_PATH = distPath;

const SERVER_DIST_PATH = distPath;

const nodePath = NODE_PATH
  .split(path.delimiter)
  .filter((folder) => folder && !path.isAbsolute(folder))
  .map((folder) => resolveApp(folder))
  .join(path.delimiter);

const config = {
  publicPath: '/',
  isProduction: NODE_ENV === 'production',
  nodePath,
  appPath,
  appPublic: resolveApp('public'),
  appHtml: resolveApp('public/index.html'),
  appPackageJson: resolveApp('package.json'),
  appNodeModulesPath: resolveApp('node_modules'),
  tsCompilerOptions: tsconfig.compilerOptions,
  srcPath: resolveApp('src'),
  distPath,
  polyfills: ['isomorphic-fetch'],
  VERSION: packageInfo.version,
  NODE_ENV,
  ANALYZE_BUNDLE,
  CLIENT_DIST_PATH,
  SERVER_DIST_PATH
};

export default config;

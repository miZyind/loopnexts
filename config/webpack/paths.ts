// Node module
import fs from 'fs';
import path from 'path';

const appPath = fs.realpathSync(process.cwd());

const resolveApp = (relativePath: string) => path.resolve(appPath, relativePath);

const paths = {
  resolveApp,
  dist: resolveApp('dist'),
  nodeModules: resolveApp('node_modules'),
  htmlTemplate: resolveApp('public/index.html'),
  client: resolveApp('src/client'),
  server: resolveApp('src/server')
};

export default paths;

// Node module
import fs from 'fs';
import path from 'path';

const appPath = fs.realpathSync(process.cwd());

const resolveApp = (relativePath: string) => path.resolve(appPath, relativePath);

const paths = {
  dist: resolveApp('dist'),
  template: resolveApp('public/index.html'),
  client: resolveApp('src/client')
};

export default paths;

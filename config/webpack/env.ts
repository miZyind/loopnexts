// Version
import packageInfo from '../../package.json';
// TSConfig
import tsconfig from '../../tsconfig.json';

const env = {
  appName: 'RKSTWB',
  appVersion: packageInfo.version,
  appPort: 3500,
  tsCompilerOptions: tsconfig.compilerOptions
};

export default env;

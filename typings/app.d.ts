// Config
declare module '*package.json';
// Webpack plugin
declare module '*webpack-plugin';
declare module 'webpack-node-externals';
// Other
declare module 'koa-webpack';
declare module 'react-perf-devtool';
// Redux DevTools
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
}

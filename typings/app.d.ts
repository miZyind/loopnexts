// Webpack plugin
declare module '*webpack-plugin';
declare module 'webpack-node-externals';
// Other
declare module 'react-perf-devtool';
// Asset
declare module '@assets/*'
// Redux DevTools
interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

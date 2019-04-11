// Next plugin
declare module 'next-fonts';
declare module '@zeit/next-css';
declare module 'next-optimized-images';
declare module '@zeit/next-typescript';
// React Perf Devtool
declare module 'react-perf-devtool';
interface Window {
  // React Perf Devtool
  observer: any;
  // Next Redux
  __NEXT_REDUX_STORE__: any;
}

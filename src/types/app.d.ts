interface NodeModule { hot: { accept(): void }; }

declare module '*package.json' {
  const packageInfo: { version: string; };
  export default packageInfo;
}

declare module '*tsconfig.json' {
  const tsconfig: {
    compilerOptions: {
      target: string;
      module: string;
      strict: boolean;
      outDir: string;
      sourceMap: boolean;
      jsx: string;
      moduleResolution: string;
      emitDecoratorMetadata: boolean;
      experimentalDecorators: boolean;
      allowSyntheticDefaultImports: boolean;
      esModuleInterop: boolean;
    };
  };
  export default tsconfig;
}

declare module 'koa-webpack-middleware';

// Webpack plugins
declare module '*webpack-plugin';
declare module 'optimize-js-plugin';
declare module 'webpack-node-externals';

import { ApplicationConfig } from '@loopback/core';

const config: ApplicationConfig = {
  rest: {
    port: +process.env.PORT! || 3000,
    host: process.env.HOST || 'localhost',
    openApiSpec: {
      // useful when used with OASGraph to locate your application
      setServersFromRequest: true,
    },
  },
};

export default config;

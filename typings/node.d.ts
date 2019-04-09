declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    NAME: string;
    VERSION: string;
    PROTOCOL: string;
    HOST: string;
    PORT: string;
    BASE_PATH: string;
  }
}

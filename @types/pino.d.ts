import 'pino';
declare module 'pino' {
  interface PrettifierOptions extends PrettyOptions {
    messageKey: string;
  }

  interface LoggerOptions {
    prettifier: (opts: PrettifierOptions) => (log: LogDescriptor) => string
  }
}

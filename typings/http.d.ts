import i18next from 'i18next';
declare module 'http' {
  interface IncomingMessage {
    i18n: typeof i18next & { toJSON: () => null };
  }
}

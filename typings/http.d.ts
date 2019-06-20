declare module 'http' {
  import i18next from 'i18next';
  interface IncomingMessage {
    i18n: typeof i18next & { toJSON: () => null };
  }
}

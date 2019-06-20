import 'next';
import { Store } from 'redux';
declare module 'next' {
  interface NextContext {
    store?: Store;
  }
}

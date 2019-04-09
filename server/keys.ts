// Node module
import { Server } from 'next';
import { BindingKey } from '@loopback/context';

export const AppBindings = {
  NEXT_SERVER: BindingKey.create<Server>('app.NextServer'),
  NAME: BindingKey.create<string>('app.Name'),
  VERSION: BindingKey.create<string>('app.Version'),
  BASE_API_PATH: BindingKey.create<string>('app.BaseApiPath'),
};

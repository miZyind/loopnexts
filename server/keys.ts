// Node module
import { Server } from 'next';
import { BindingKey } from '@loopback/context';

export const AppBindings = {
  NEXT_SERVER: BindingKey.create<Server>('app.NextServer'),
  BASE_API_PATH: BindingKey.create<string>('app.BaseApiPath'),
  BASE_ASSETS_PATH: BindingKey.create<string>('app.BaseAssetsPath'),
};

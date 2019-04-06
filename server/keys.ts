// Node module
import { Server } from 'next';
import { BindingKey } from '@loopback/context';

export const AppBindings = {
  NEXT_SERVER: BindingKey.create<Server>('next.server'),
};

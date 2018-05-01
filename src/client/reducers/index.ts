// Node module
import { combineReducers } from 'redux';
// Model
import { IStore } from '../models';
// Reducer
import main from '@reducers/main';

export default combineReducers<IStore>({
  main
} as any);

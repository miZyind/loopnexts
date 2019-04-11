// Node module
import { combineReducers } from 'redux';
// Model
import { IStore } from '../models';
// Reducer
import main from './main';

const rootReducer = combineReducers<IStore>({
  main,
});

export default rootReducer;

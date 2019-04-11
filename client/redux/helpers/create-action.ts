// Node module
import { Action } from 'redux';

// FluxStandardAction
interface IFluxStandardAction<T extends string, P> extends Action<T> {
  payload: P;
  error?: boolean;
  meta?: any;
}

export default function createAction<T extends string>(type: T): Action<T>;
export default function createAction<T extends string, P>(
  type: T,
  payload: P,
): IFluxStandardAction<T, P>;
export default function createAction<T extends string, P>(
  type: T,
  payload?: P,
) {
  return payload === undefined ? { type } : { type, payload };
}

// Node module
import React from 'react';
import produce, { Draft } from 'immer';

type ActionCreator<A> = (...args: any[]) => A;

type Dispatch<A> = (value: A) => void;

interface IActionCreators<Action> {
  [name: string]: ActionCreator<Action>;
}

type ActionsUnion<ActionCreators extends IActionCreators<any>> = ReturnType<
  ActionCreators[keyof ActionCreators]
>;

type MappedActionCreators<
  Action,
  ActionCreators extends IActionCreators<Action>
> = {
  [key in keyof ActionCreators]: (
    ...args: Parameters<ActionCreators[keyof ActionCreators]>
  ) => void
};

function bindActionCreator<Action>(
  actionCreator: ActionCreator<Action>,
  dispatch: Dispatch<Action>,
) {
  return function bind() {
    return dispatch(actionCreator.apply(null, Array.from(arguments)));
  };
}

function mapDispatchToActionCreators<
  Action,
  ActionCreators extends IActionCreators<Action>
>(
  actionCreators: ActionCreators,
  dispatch: Dispatch<ActionsUnion<ActionCreators>>,
) {
  return Object.entries(actionCreators).reduce<
    MappedActionCreators<Action, ActionCreators>
  >(
    produce((draft, [name, creator]) => {
      draft[name] = bindActionCreator(creator, dispatch);
    }),
    actionCreators,
  );
}

interface IContext<
  State,
  Action,
  ActionCreators extends IActionCreators<Action>
> {
  state: State;
  actions: MappedActionCreators<Action, ActionCreators>;
}

export function createAction<T extends string>(type: T): { type: T };
export function createAction<T extends string, P>(
  type: T,
  payload: P,
): { type: T; payload: P };
export function createAction<T extends string, P, M>(
  type: T,
  payload: P,
  meta: M,
): { type: T; payload: P; meta: M };
export function createAction<T extends string, P, M>(
  type: T,
  payload?: P,
  meta?: M,
) {
  return meta === undefined
    ? payload === undefined
      ? { type }
      : { type, payload }
    : { type, payload, meta };
}

export function createReducer<State, Action>(
  recipe: (draft: State, action: Action) => void,
) {
  return produce(recipe);
}

export function createContext<
  State,
  Action,
  ActionCreators extends IActionCreators<Action>
>(
  initialState: State,
  actionCreators: ActionCreators,
  recipe: (draft: Draft<State>, action: ActionsUnion<ActionCreators>) => void,
) {
  const reducer = (state: State, action: ActionsUnion<ActionCreators>) =>
    produce(state, (draft) => recipe(draft, action));

  const Context = React.createContext<IContext<State, Action, ActionCreators>>({
    state: initialState,
    actions: actionCreators,
  });

  const ContextProvider: React.FC = ({ children }) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const actions = mapDispatchToActionCreators(actionCreators, dispatch);

    return (
      <Context.Provider value={{ state, actions }}>{children}</Context.Provider>
    );
  };

  const useContext = () => React.useContext(Context);

  return { ContextProvider, useContext };
}

// Node module
import React, {
  FC,
  Reducer,
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReducerAction,
} from 'react';
import createAction from './helpers/create-action';
import { ActionsUnion } from './helpers/actions-union';

interface IState extends Current {
  displayType: 'mobile' | 'tablet' | 'desktop';
}

enum ActionTypes {
  WINDOW_RESIZE = '[layout] window resize',
}

type Actions = ActionsUnion<typeof Actions>;

const Actions = {
  windowResize: (innerWidth: number) =>
    createAction(ActionTypes.WINDOW_RESIZE, { innerWidth }),
};

type Current = typeof Actions;

export const initialState: IState = {
  displayType: 'desktop',
  ...Actions,
};

const LayoutContext = createContext(initialState);

export const reducer: Reducer<IState, Actions> = (state, action) => {
  switch (action.type) {
    case ActionTypes.WINDOW_RESIZE:
      const mobileWidth = 425;
      const tabletWidth = 993;
      const { innerWidth } = action.payload;
      const displayType =
        innerWidth <= mobileWidth
          ? 'mobile'
          : mobileWidth < innerWidth && innerWidth <= tabletWidth
          ? 'tablet'
          : 'desktop';
      return { ...state, displayType };
    default:
      return state;
  }
};

function mapDispatchToActionCreator<
  T extends Function,
  D extends Dispatch<ReducerAction<Reducer<IState, Actions>>>
>(actionCreator: T, dispatch: D) {
  return function bind() {
    return dispatch(actionCreator.apply(null, arguments));
  };
}

export const LayoutContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = Object.entries(Actions).reduce(
    (prev, [actionName, actionCreator]) => {
      prev[actionName] = mapDispatchToActionCreator(actionCreator, dispatch);
      return prev;
    },
    {} as any,
  );

  return (
    <LayoutContext.Provider value={{ ...state, ...actions }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutValue = () => useContext(LayoutContext);

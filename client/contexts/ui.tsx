// Node module
import produce from 'immer';
import { FC, createContext, useReducer, useContext } from 'react';
import { ActionType, createStandardAction } from 'typesafe-actions';

import {
  IActionCreators,
  IMappedActionCreators,
  mapDispatchToActionCreators,
} from '../helpers';

/**
 * The Standard Bootstrap 4.x Breakpoints
 *  https://medium.com/@uiuxlab/the-most-used-responsive-breakpoints-in-2017-of-mine-9588e9bd3a8a
 */
enum Breakpoints {
  mobile = 575,
  tablet = 991,
  desktop = 1199,
}

enum DisplayTypes {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}

interface IState {
  displayType: DisplayTypes;
}

const initialState: IState = {
  displayType: DisplayTypes.mobile,
};

enum ActionTypes {
  windowResize = '[ui] window resize',
}

const actionCreators = {
  windowResize: createStandardAction(ActionTypes.windowResize)<number>(),
};

type Action = ActionType<typeof actionCreators>;

const reducer = (state = initialState, action: Action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case ActionTypes.windowResize:
        const { payload: width } = action;
        draft.displayType = DisplayTypes.desktop;
        if (width > Breakpoints.mobile && width <= Breakpoints.tablet) {
          draft.displayType = DisplayTypes.tablet;
        }
        if (width <= Breakpoints.mobile) {
          draft.displayType = DisplayTypes.mobile;
        }
        break;
    }
  });

interface IContext {
  state: IState;
  actions?: IMappedActionCreators<Action, IActionCreators<Action>>;
}

const UIContext = createContext<IContext>({
  state: initialState,
});

export const UIContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = mapDispatchToActionCreators(actionCreators, dispatch);
  return (
    <UIContext.Provider value={{ state, actions }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUIContext = () => useContext(UIContext);

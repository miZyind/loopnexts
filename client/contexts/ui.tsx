// Node module
import { createAction, createContext } from '../helpers';

/**
 * The Standard Semantic UI Breakpoints
 * https://semantic-ui.com/elements/container.html
 * https://medium.com/@uiuxlab/the-most-used-responsive-breakpoints-in-2017-of-mine-9588e9bd3a8a
 */
enum DisplayTypes {
  // > 1200
  LARGE_MONITOR = 'large monitor',
  // 992 ~ 1200
  SMALL_MONITOR = 'small monitor',
  // 768 ~ 991
  TABLET = 'tablet',
  // < 768
  MOBILE = 'mobile',
}

interface IState {
  displayType: DisplayTypes;
}

const initialState: IState = {
  displayType: DisplayTypes.MOBILE,
};

enum ActionTypes {
  WINDOW_RESIZE = '[ui] window resize',
}

const actionCreators = {
  windowResize: (width: number) =>
    createAction(ActionTypes.WINDOW_RESIZE, width),
};

const { ContextProvider, useContext } = createContext(
  initialState,
  actionCreators,
  (draft, action) => {
    switch (action.type) {
      case ActionTypes.WINDOW_RESIZE:
        const { payload: width } = action;
        if (width > 1200) {
          draft.displayType = DisplayTypes.LARGE_MONITOR;
        }
        if (width >= 992 && width <= 1200) {
          draft.displayType = DisplayTypes.SMALL_MONITOR;
        }
        if (width >= 768 && width <= 991) {
          draft.displayType = DisplayTypes.TABLET;
        }
        if (width < 768) {
          draft.displayType = DisplayTypes.MOBILE;
        }
        break;
    }
  },
);

export { ContextProvider as UIContextProvider, useContext as useUIContext };

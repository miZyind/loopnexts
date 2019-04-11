// Action
import { ActionTypes, Actions } from '../actions/main';
// Model
import { IMain } from '../models/main';

const initState: IMain = {
  isLoading: true,
  isCompleted: false,
};

export default function main(state = initState, action: Actions) {
  switch (action.type) {
    case ActionTypes.TOGGLE_LOADING_STATUS: {
      return { ...state, isLoading: false };
    }
    case ActionTypes.TOGGLE_STEP_STATUS: {
      return { ...state, isCompleted: !state.isCompleted };
    }
    default: {
      return state;
    }
  }
}

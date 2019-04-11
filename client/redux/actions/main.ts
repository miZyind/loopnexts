// Helper
import createAction from '../helpers/create-action';
import { ActionsUnion } from '../helpers/actions-union';

export enum ActionTypes {
  TOGGLE_LOADING_STATUS = '[main] toggle loading status',
  TOGGLE_STEP_STATUS = '[main] toggle step status',
}

export const Actions = {
  toggleLoadingStatus: () => createAction(ActionTypes.TOGGLE_LOADING_STATUS),
  toggleStepStatue: () => createAction(ActionTypes.TOGGLE_STEP_STATUS),
};

export type Actions = ActionsUnion<typeof Actions>;

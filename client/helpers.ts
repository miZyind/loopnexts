import produce from 'immer';

type ActionCreator<A> = (...args: any[]) => A;

type Dispatch<A> = (value: A) => void;

interface IActionCreators<Action> {
  [name: string]: ActionCreator<Action>;
}

type IMappedActionCreators<
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
>(actionCreators: ActionCreators, dispatch: Dispatch<Action>) {
  return Object.entries(actionCreators).reduce<
    IMappedActionCreators<Action, ActionCreators>
  >(
    produce((draft, [name, creator]) => {
      draft[name] = bindActionCreator(creator, dispatch);
    }),
    actionCreators,
  );
}

export { IActionCreators, IMappedActionCreators, mapDispatchToActionCreators };

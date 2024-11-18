import { useDispatch, useSelector } from 'react-redux';
import { ofType } from 'redux-observable';
import { ignoreElements, tap } from 'rxjs';
import { actionEvent } from './helpers';

// Action Types
export const counterActionTypes = {
  decremented: 'counter/decremented',
  incremented: 'counter/incremented',
};

// Epic
export const counterEpic = (action$) =>
  action$.pipe(
    ofType(counterActionTypes.decremented, counterActionTypes.incremented),
    // eslint-disable-next-line no-console
    tap((action) => console.log(`Epic: ${action.type}`)),
    ignoreElements()
  );

// Reducer
export const counterInitialState = { count: 0 };
export const counterReducer = (state = counterInitialState, action) => {
  switch (action.type) {
    case counterActionTypes.decremented:
      return { count: state.count - 1 };
    case counterActionTypes.incremented:
      return { count: state.count + 1 };
    default:
      return counterInitialState;
  }
};

// Hook
export const useCounter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return {
    counter,
    handleDecrementClick: () => dispatch(actionEvent(counterActionTypes.decremented)),
    handleIncrementClick: () => dispatch(actionEvent(counterActionTypes.incremented)),
  };
};

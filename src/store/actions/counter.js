import * as actionTypes from './actionTypes';

const incrementCounter = () => ({
  type: actionTypes.INCREMENT_COUNTER,
  payload: 'Increment',
});

const decrementCounter = () => ({
  type: actionTypes.DECREMENT_COUNTER,
  payload: 'Decrement',
});

const resetCounter = () => ({
  type: actionTypes.RESET_COUNTER,
  payload: 'Reset',
});

export {
  incrementCounter,
  decrementCounter,
  resetCounter,
};

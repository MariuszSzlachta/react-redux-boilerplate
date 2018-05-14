import * as actionTypes from './actionTypes';

const incrementCounter = () => ({
  type: actionTypes.INCREMENT_COUNTER,
});

const decrementCounter = () => ({
  type: actionTypes.DECREMENT_COUNTER,
});

const resetCounter = () => ({
  type: actionTypes.RESET_COUNTER,
});

export {
  incrementCounter,
  decrementCounter,
  resetCounter,
};

import * as actionTypes from '../actions/actionTypes';
import createReducer from './createReducer';

const initialState = {
  lastAction: '',
  counter: 0,
};

const incrementCounter = (state, { payload }) => ({
  ...state,
  lastAction: payload,
  counter: state.counter + 1,
});

const decrementCounter = (state, { payload }) => ({
  ...state,
  lastAction: payload,
  counter: state.counter + 1,
});

const resetCounter = (state, { payload }) => ({
  ...state,
  lastAction: payload,
  counter: 0,
});

export default createReducer(initialState, {
  [actionTypes.INCREMENT_COUNTER]: incrementCounter,
  [actionTypes.DECREMENT_COUNTER]: decrementCounter,
  [actionTypes.RESET_COUNTER]: resetCounter,
});

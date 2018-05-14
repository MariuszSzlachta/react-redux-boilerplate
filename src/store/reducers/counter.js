import * as actionTypes from '../actions/actionTypes';

const initialState = {
  lastAction: '',
  counter: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT_COUNTER: {
      return {
        ...state,
        lastAction: 'Increment',
        counter: state.counter + 1,
      };
    }
    case actionTypes.DECREMENT_COUNTER: {
      return {
        ...state,
        lastAction: 'Decrement',
        counter: state.counter - 1,
      };
    }
    case actionTypes.RESET_COUNTER: {
      return {
        ...state,
        lastAction: 'Reset',
        counter: 0,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

const counterReducerDefaultState = {
  count: 0
}

const counterReducer = (state = counterReducerDefaultState, action) => {
  switch (action.type) {

    case 'INCREMENT_COUNTER':
      return {
        count: state.count + action.incrementBy
      }

    case 'DECREMENT_COUNTER':
      return {
        count: state.count - action.decrementBy
      }

    case 'RESET_COUNTER':
      return {
        count: 0
      }

    default:
      return state;
  }
}

export default counterReducer;

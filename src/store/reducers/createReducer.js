// This function returns normal reducer function (1) but thanks to clousers it still have access
// to `initialState` and `actionHandlers` object from `createReducer` function (2).
// During dispatching action, returned reducer function will look for function in `actionHandlers`
// object (function with same name as dispatched action type) and execute it is exists or
// return state if not.
// Handler function is simple function which gets current state and returns new state (just like
// switch statement).
export default function createReducer(initialState, actionHandlers) { // (2)
  return (state = initialState, action) => { // (1)
    const handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
  };
}

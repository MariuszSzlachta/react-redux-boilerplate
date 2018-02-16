import { createStore } from 'redux';

// Reducers
import counterReducer from '../reducers/counter';

export default () => {
  const store = createStore(
    counterReducer, 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

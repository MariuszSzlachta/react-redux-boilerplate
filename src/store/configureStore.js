import { createStore, combineReducers } from 'redux';

import counterReducer from '../reducers/counter';
import listReducer from '../reducers/list';

export default () => {
  const store = createStore(
    combineReducers({
      counter: counterReducer,
      list: listReducer
    }), 
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
};

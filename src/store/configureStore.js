import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { counterReducer, listReducer } from 'Reducers';

export default () => {
  const store = createStore(
    combineReducers({
      counter: counterReducer,
      list: listReducer,
    }),
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
  );

  return store;
};

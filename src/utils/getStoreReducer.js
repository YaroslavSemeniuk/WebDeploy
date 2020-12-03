import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { history } from './history';

export const getStoreReducer = (injectedReducers = {}) => {
  return combineReducers({
    router: connectRouter(history),
    ...injectedReducers,
  });
};

import { takeLatest, put } from 'redux-saga/effects';
import axios from 'axios';
import { push } from 'connected-react-router';

import { API_BASE } from '../../config';
import { USER_AUTH_REQUEST, USER_REGISTER_REQUEST } from './constants';
import { actionUserIsAuthSet, actionUserRegisterSuccess } from './actions';

function* handleAuth(action) {
  const { payload } = action;

  const requestUrl = `${API_BASE}/login`;

  try {
    const userAuthData = yield axios
      .post(requestUrl, payload)
      .then((response) => response.data)
      .catch((e) => console.error(e));

    yield put(actionUserIsAuthSet({ isAuth: true, userAuthData }));
  } catch (e) {
    console.error(e);
  }
}

function* handleRegister(action) {
  const { payload } = action;

  const requestUrl = `${API_BASE}/registration`;

  try {
    yield axios
      .post(requestUrl, payload)
      .then((response) => response)
      .catch((e) => console.error(e));

    yield put(actionUserRegisterSuccess());
    yield put(push('/sign-in'));
  } catch (e) {
    console.error(e);
  }
}

export function* authSaga() {
  yield takeLatest(USER_AUTH_REQUEST, handleAuth);
  yield takeLatest(USER_REGISTER_REQUEST, handleRegister);
}

import { call, fork, put, select, take, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';

import { WS_BASE } from '../../config';
import { selectUserAuthData } from '../Auth/selectors';
import {
  APP_START_INIT,
  CHAT_COMMANDS,
  INIT_SOCKET,
  ROOMS_GET_SUCCESS,
  SOCKET_CLOSE,
  SOCKET_CONNECT,
  SOCKET_MESSAGE_RECEIVE,
  SOCKET_MESSAGE_SEND,
  SOCKET_OPEN,
  USER_GET_SUCCESS,
  USERS_GET_SUCCESS,
} from './constants';
import {
  actionAppFinishInit,
  actionInitSocket,
  actionRoomsGetSuccess,
  actionSocketClose,
  actionSocketConnect,
  actionSocketError,
  actionSocketMessageReceive,
  actionSocketMessageSend,
  actionSocketOpen,
  actionUserGetSuccess,
  actionUsersGetSuccess,
  actionMessagesGetSuccess,
} from './actions';

function* handleAppStartInit() {
  const { accessToken } = yield select(selectUserAuthData);

  yield put(actionInitSocket({ token: accessToken }));
}

function* handleSocketInit(action) {
  const { payload } = action;
      /*?token=${payload.token}*/
  // var wsUrl = `${WS_BASE}/ws`;
  try {
    const socket = new WebSocket("ws://localhost:8080/ws");
    yield put(actionSocketConnect({ socket }));
  } catch (e) {
    console.error(e);
  }
}

// function connect() {
//   WS = new WebSocket("ws://localhost:8080/ws?token=dsadasdasdasdasdasdasdasdasdasd");
//
//   WS.onopen=function (e) {
//   };
//   WS.onmessage = function (event) {
//     showGreding(event.data);
//   };
//   WS.onclose = function (event) {
//     if(event.wasClean){
//       alert("соединение закрыто");
//     }
//   };
//   WS.onerror = function (error) {
//     alert(error);
//   }
// }


function watchMessage(socket) {
  return eventChannel((emitter) => {
    socket.onopen = (event) => emitter(actionSocketOpen(event));
    socket.onclose = (event) => emitter(actionSocketClose(event));
    socket.onerror = (event) => emitter(actionSocketError(event));
    socket.onmessage = (event) => {
      console.log(event.data);
      emitter(actionSocketMessageReceive(JSON.parse(event.data)));
  }

    return () => {
      socket.close();
    };
  });
}

function* internalListener(socket) {
  while (true) {
    const action = yield take(SOCKET_MESSAGE_SEND);
    socket.send(JSON.stringify(action.payload));
  }
}

function* externalListener(socketChannel) {
  while (true) {
    const action = yield take(socketChannel);
    yield put(action);
  }
}

function* handleSocketManager(action) {
  const { payload } = action;

  const socketChannel = yield call(watchMessage, payload.socket);

  yield fork(externalListener, socketChannel);
  yield fork(internalListener, payload.socket);

  const cancel = yield take(SOCKET_CLOSE);

  if (cancel) {
    socketChannel.close();
  }
}

function* handleGetInitialData() {
  const { userId } = yield select(selectUserAuthData);

  yield put(actionSocketMessageSend({ command: CHAT_COMMANDS.CURRENT_USER, data: { userId } }));
  yield put(actionSocketMessageSend({ command: CHAT_COMMANDS.USERS }));
  yield put(actionSocketMessageSend({ command: CHAT_COMMANDS.ROOMS }));

  yield take([USER_GET_SUCCESS, USERS_GET_SUCCESS, ROOMS_GET_SUCCESS]);

  yield put(actionAppFinishInit());
}

function* receiveMessages(action) {
  const { payload } = action;
  console.log(payload);

  switch (payload.command) {
    case CHAT_COMMANDS.CURRENT_USER: {
      yield put(actionUserGetSuccess({ data: payload.data }));
      break;
    }
    case CHAT_COMMANDS.USERS: {
      yield put(actionUsersGetSuccess({ data: payload.data }));
      break;
    }
    case CHAT_COMMANDS.ROOMS: {
      yield put(actionRoomsGetSuccess({ data: payload.data }));
      break;
    }
    case CHAT_COMMANDS.JOINROOM: {
      yield put(actionMessagesGetSuccess({ data: payload.data }));
      break;
    }
  }
}

export function* appSaga() {
  yield takeLatest(APP_START_INIT, handleAppStartInit);
  yield takeLatest(INIT_SOCKET, handleSocketInit);
  yield takeLatest(SOCKET_CONNECT, handleSocketManager);
  yield takeLatest(SOCKET_OPEN, handleGetInitialData);
  yield takeLatest(SOCKET_MESSAGE_RECEIVE, receiveMessages);
}

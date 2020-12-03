import {
  APP_FINISH_INIT,
  USER_GET_SUCCESS,
  USERS_GET_SUCCESS,
  ROOMS_GET_SUCCESS,
    MESSAGES_GET_SUCCESS,
} from './constants';

export const initialState = {
  isReady: false,
  currentUser: {},
  users: [],
  rooms: [],
  messages: [],
  onlineUsers: [],
  currentRoomMessages: [],
};

export const appReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case APP_FINISH_INIT: {
      return { ...state, isReady: true };
    }
    case USER_GET_SUCCESS: {
      return { ...state, currentUser: payload.data };
    }
    case USERS_GET_SUCCESS: {
      return { ...state, users: payload.data };
    }
    case ROOMS_GET_SUCCESS: {
      return { ...state, rooms: payload.data };
    }
    case MESSAGES_GET_SUCCESS: {
      return { ...state, currentRoomMessages: payload.data };
    }
    default: {
      return state;
    }
  }
};

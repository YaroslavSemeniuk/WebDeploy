import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Toolbar } from '@material-ui/core';

import {
  selectUsers,
  selectRooms,
  selectCurrentUser,
  selectCurrentRoomMessages,
  selectOnlineUsers,
} from '../App/selectors';
import { actionSocketMessageSend } from '../App/actions';
import { CHAT_COMMANDS } from '../App/constants';
import { Messenger } from '../../Components';

export const People = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const users = useSelector(selectUsers);
  const rooms = useSelector(selectRooms);
  const messages = useSelector(selectCurrentRoomMessages);
  const onlineUsers = useSelector(selectOnlineUsers);

  const [filteredUsers, setFilteredUsers] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState(null);

  useEffect(() => {
    return () => {
      setCurrentConversation(null);
    };
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users
        .filter((user) => user._id !== currentUser._id)
        .map((user) => {
          user.isOnline = !!onlineUsers.includes(user._id);
          return user;
        }),
    );
  }, [currentUser, users, onlineUsers]);

  useEffect(() => {
    setFilteredRooms(rooms.filter((room) => room.is_user));
  }, [rooms]);

  useEffect(() => {
    if (currentConversation) {
      dispatch(
        actionSocketMessageSend({
          command: CHAT_COMMANDS.JOINROOM,
          data: { roomId: currentConversation._id, userId: currentUser._id },
        }),
      );
    } else if (filteredRooms && filteredRooms.length) {
      setCurrentConversation(filteredRooms[0]);
    }
  }, [dispatch, currentConversation, filteredRooms, currentUser]);

  const handleSendMessage = useCallback(
    (message) =>
      dispatch(
        actionSocketMessageSend({
          command: CHAT_COMMANDS.SENDMESSAGE,
          data: {
            message,
            user: currentUser._id,
            roomId: currentConversation._id,
            date: new Date(),
          },
        }),
      ),
    [dispatch, currentUser, currentConversation],
  );

  return (
    <div>
      <Toolbar />
      {currentConversation ? (
        <Messenger
          title="People"
          userId={currentUser._id}
          rooms={filteredUsers}
          messages={messages}
          currentConversation={currentConversation}
          handleChangeRoom={setCurrentConversation}
          handleSendMessage={handleSendMessage}
        />
      ) : (
        <CircularProgress />
      )}
    </div>
  );
};

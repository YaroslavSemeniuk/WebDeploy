import React, { useState, useEffect, useCallback } from 'react';
import { Box, Toolbar, CircularProgress } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { selectRooms, selectCurrentUser, selectCurrentRoomMessages } from '../App/selectors';
import { Messenger } from '../../Components';
import { actionSocketMessageSend } from '../App/actions';
import { CHAT_COMMANDS } from '../App/constants';

export const Channels = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const rooms = useSelector(selectRooms);
  const messages = useSelector(selectCurrentRoomMessages);

  const [currentConversation, setCurrentConversation] = useState(null);
  const [filteredRooms, setFilteredRooms] = useState(null);

  useEffect(() => {
    return () => {
      setCurrentConversation(null);
    };
  }, []);

  useEffect(() => {
    setFilteredRooms(rooms.filter((room) => !room.is_user));
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
  }, [dispatch, currentConversation, filteredRooms, currentUser._id]);

  const handleSendMessage = useCallback(
    (message) => {
      dispatch(
        actionSocketMessageSend({
          command: CHAT_COMMANDS.SENDMESSAGE,
          data: {
            message,
            userId: currentUser._id,
            roomId: currentConversation._id,
            timestamp: new Date(),
          },
        }),
      );
      setFilteredRooms((state) =>
        state.map((room) => {
          if (room._id === currentConversation._id) {
            room.snippet = message.message;
          }
          return room;
        }),
      );
    },
    [dispatch, currentUser, currentConversation],
  );
  // const handleSubscribeRoom = useCallback(
  //   () =>
  //     dispatch(
  //       actionSocketMessageSend({
  //         event: 'message',
  //         data: { message, roomId: currentConversation._id },
  //       }),
  //     ),
  //   [dispatch, currentConversation],
  // );

  // const isShowJoinButton = !(
  //   currentConversation && currentConversation.users.find((user) => user === currentUser._id)
  // );

  return (
    <Box>
      <Toolbar />
      {currentConversation ? (
        <Messenger
          title="Channels"
          isCreateConversation
          userId={currentUser._id}
          rooms={filteredRooms}
          messages={messages}
          currentConversation={currentConversation}
          // isShowJoinButton={isShowJoinButton}
          handleChangeRoom={setCurrentConversation}
          handleSendMessage={handleSendMessage}
          // handleSubscribeRoom={handleSubscribeRoom}
        />
      ) : (
        <CircularProgress />
      )}
    </Box>
  );
};

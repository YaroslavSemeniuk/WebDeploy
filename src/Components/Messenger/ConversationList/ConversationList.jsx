import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';

import { ConversationSearch } from './ConversationSearch';
import { ConversationListItem } from './ConversationListItem';
import { Toolbar } from '../Toolbar/Toolbar';
import { ToolbarButton } from '../Toolbar/ToolbarButton';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100vh - 112px)',
  },
  scrollable: {
    position: 'relative',
    overflowY: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
  },
}));

export function ConversationList(props) {
  const { title, rooms, currentConversation, isCreateConversation, handleChangeRoom } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Toolbar
        title={title}
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={
          isCreateConversation
            ? [<ToolbarButton key="add" icon="ion-ios-add-circle-outline" />]
            : []
        }
      />
      <ConversationSearch />
      <div className={classes.scrollable}>
        {rooms.map((conversation) => (
          <ConversationListItem
            key={conversation._id}
            isActive={conversation._id === currentConversation._id}
            conversation={conversation}
            name={conversation.name}
            snippet={conversation.snippet}
            handleChangeRoom={handleChangeRoom}
          />
        ))}
      </div>
    </div>
  );
}

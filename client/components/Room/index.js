import { connect } from 'react-redux';
import React, { Component } from 'react';
import RoomHeader from '../RoomHeader';
import MessageList from '../MessageList';
import Message from '../Message';
import RoomInput from '../RoomInput';
import './index.scss';

class Room extends Component {
  render() {
    const { room, showPreview, inputText } = this.props;
    const { orderedMessages, roomMessages, roomUsers } = room;

    const ourUserID = room.userID;
    const {nick: ourNick, avatar: ourAvatar} = room.roomUsers[ourUserID];

    const messages = orderedMessages.map(messageID => {
      const { text, time, userID,
              status, attachments } = roomMessages[messageID];
      const { nick, avatar } = roomUsers[userID] ? roomUsers[userID] : {
        nick: 'Leaved user',
        avatar: '', // TODO link to our logo with anonym man
      };

      const isOurMessage = (ourUserID === userID);

      return {
        text,
        time,
        nick,
        isOurMessage,
        avatar,
        status,
        attachments,
      };
    });

    const previewMessage = {
      text: inputText,
      time: null,
      nick: ourNick,
      avatar: ourAvatar,
      status: 'preview',
      attachments: [],
    };

    return (
      <div className="room">
        <RoomHeader room={room} />
        <div className="room-messages" id="roomMessages">
          {!showPreview ? false :
            <div className="room-messages-preview">
              <Message message={previewMessage} />
            </div>
          }
          <MessageList messages={messages} />
        </div>
        <RoomInput />
      </div>
    );
  }
}

export default connect(state => {
  const inputText = state.ui.roomInputText;
  const { previewCollapsed } = state.ui;
  return {
    showPreview: !!inputText && !previewCollapsed,
    inputText,
  };
})(Room);


import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { messagesT } from '../../propTypes';
import RoomHeader from '../RoomHeader/RoomHeader';
import MessageList from '../MessageList/MessageList';
import RoomInput from '../RoomInput/RoomInput';
import './Room.scss';
import { sendMessage } from '../../smartActions';

class Room extends Component {
  render() {
    const { dispatch } = this.props;
    const { roomID, secret, orderedMessages,
            roomMessages, roomUsers } = this.props.room;
    const myUserID = this.props.room.userID;
    const messages = orderedMessages.map(messageID => {
      const { text, time, userID } = roomMessages[messageID]
      return {
        text,
        time,
        nick: roomUsers[userID],
        avatar: roomUsers[userID],
      };
    });
    const onSend = text => sendMessage(dispatch, {
      roomID,
      myUserID,
      secret,
      text,
      // no time here!
    });

    return (
      <div className="room">
        <RoomHeader />
        <div className="room-messages">
          <MessageList
            messages={messages}
          />
        </div>
        <RoomInput
          onSend={onSend}
        />
      </div>
    );
  }
}

export default connect()(Room);


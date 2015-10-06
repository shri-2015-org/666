import { connect } from 'react-redux';
import React, { Component } from 'react';
import RoomHeader from '../RoomHeader';
import MessageList from '../MessageList';
import RoomInput from '../RoomInput';
import './index.scss';
import { sendMessage } from '../../smartActions';
import { roomInputChange } from '../../actions';

class Room extends Component {
  render() {
    const { dispatch, room, inputText, buttonEnabled } = this.props;
    const { orderedMessages, roomMessages, roomUsers } = room;
    const messages = orderedMessages.map(messageID => {
      const { text, time, userID, status } = roomMessages[messageID];
      const { nick, avatar } = roomUsers[userID];
      return {
        text,
        time,
        nick,
        avatar,
        status,
      };
    });
    const onChange = text => dispatch(roomInputChange(text));
    const onSend = () => dispatch(sendMessage());

    return (
      <div className="room">
        <RoomHeader room={room} />
        <div className="room-messages">
          <MessageList
            messages={messages}
          />
        </div>
        <RoomInput
          onSend={onSend}
          onChange={onChange}
          buttonEnabled={buttonEnabled}
          text={inputText}
        />
      </div>
    );
  }
}

export default connect(state => {
  const inputText = state.ui.roomInputText;
  return {
    buttonEnabled: !!inputText,
    inputText,
  };
})(Room);


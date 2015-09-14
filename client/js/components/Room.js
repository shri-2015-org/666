import React, { Component } from 'react';
import MessageList, { MessagesT } from './MessageList';
export { MessagesT } from './MessageList';
import Input, { ClickHandlerT } from './Input';

export default class Room extends Component {
  render() {
    return (
      <div className="room">
        <div className="room-header">
        </div>
        <div className="room-messages">
          <MessageList
            messages={this.props.messages}
          />
        </div>
        <div className="room-actions">
          <Input
            onClick={this.props.onSend}
          />
        </div>
      </div>
    );
  }
}

export const SendHandlerT = ClickHandlerT;

Room.propTypes = {
  onSend: SendHandlerT,
  messages: MessagesT,
};

import React, { Component } from 'react';
import MessageList, { MessagesT } from './MessageList';
export { MessagesT } from './MessageList';
import Input, { OnSendT } from './Input';

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
         <Input
          onSend={this.props.addMessage}
          />
      </div>
    );
  }
}

export const OnAddMessageT = OnSendT;

Room.propTypes = {
  addMessage: OnAddMessageT,
  messages: MessagesT,
};


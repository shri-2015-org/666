import React, { Component } from 'react';
import MessageList, { MessagesT } from './MessageList';
export { MessagesT } from './MessageList';
import Input, { OnSendT } from './Input';
import { toPropTypes } from '~/common/utils/invariants';

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

Room.propTypes = toPropTypes({
  addMessage: OnAddMessageT,
  messages: MessagesT,
});


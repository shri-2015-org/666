import { ArrayOf } from '../types';
import React, { Component } from 'react';
import Message, { MessageT } from './Message';

export default class MessageList extends Component {
  render() {
    return (
      <div className="messages">
        {this.props.messages.map((message, index) =>
          <Message
            {...message}
            key={index}
          />
        )}
      </div>
    );
  }
}

export const MessagesT = ArrayOf(MessageT);

MessageList.propTypes = {
  messages: MessagesT,
};

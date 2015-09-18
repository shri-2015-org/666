import { Shape, ArrayOf, Str } from '../types';
import React, { Component } from 'react';
import Message from './Message';

export default class MessageList extends Component {
  render() {
    return (
      <ul className="messages">
        {this.props.messages.map((message, index) =>
          <Message
            {...message}
            key={index}
          />
        )}
      </ul>
    );
  }
}

const MessageT =
  Shape({
    text: Str,
  });

export const MessagesT = ArrayOf(MessageT);

MessageList.propTypes = {
  messages: MessagesT,
};

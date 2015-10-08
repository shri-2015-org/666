import React, { Component } from 'react';
import Message from '../Message';
import './index.scss';

export default class MessageList extends Component {
  render() {
    const { messages } = this.props;
    return (
      <ul className="messages">
        {messages.map((message, index) =>
          <Message
            message={message}
            key={index}
          />
        )}
      </ul>
    );
  }
}


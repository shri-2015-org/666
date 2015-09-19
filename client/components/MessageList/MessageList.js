import React, { Component, PropTypes } from 'react';
import Message from '../Message/Message';
import './MessageList.scss';

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

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

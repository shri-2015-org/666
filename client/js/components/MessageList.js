import React, { Component, PropTypes } from 'react';
import Message from './Message';

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

MessageList.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
  }).isRequired).isRequired,
};

import React, { Component, PropTypes } from 'react';
import Message from './Message';

export default class MessageList extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="messages">
        {this.props.messages.map((message, index) =>
          <Message {...message} />
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

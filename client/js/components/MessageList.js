import React, { Component, PropTypes } from 'react';
import Message from './Message';

export default class MessageList extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <ul>
        {this.props.messages.map((message, index) =>
          <Message {...message} />
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

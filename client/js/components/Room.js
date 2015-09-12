import React, { Component, PropTypes } from 'react';
import { messagesT } from '../propTypes';
import MessageList from './MessageList';
import Input from './Input';

export default class Room extends Component {
  render() {
    return (
      <div>
        <MessageList
          messages={this.props.messages}
        />
        <Input
          onClick={this.props.onSend}
        />
      </div>
    );
  }
}

Room.propTypes = {
  onSend: PropTypes.func.isRequired,
  messages: messagesT,
};

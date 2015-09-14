import React, { Component, PropTypes } from 'react';
import { messagesT } from '../propTypes';
import MessageList from './MessageList';
import Input from './Input';

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
        <div className="room-actions">
          <Input
            onClick={this.props.onSend}
          />
        </div>
      </div>
    );
  }
}

Room.propTypes = {
  onSend: PropTypes.func.isRequired,
  messages: messagesT,
};

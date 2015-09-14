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
         <Input
          onSend={this.props.addMessage}
          />
      </div>
    );
  }
}

Room.propTypes = {
  addMessage: PropTypes.func.isRequired,
  messages: messagesT,
};


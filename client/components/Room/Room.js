import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { messagesT } from '../../propTypes';
import RoomHeader from '../RoomHeader/RoomHeader';
import MessageList from '../MessageList/MessageList';
import RoomInput from '../RoomInput/RoomInput';
import './Room.scss';

const ConnectedRoomHeader = connect(state => ({collapsed: state.navigation, login: state.login}))(RoomHeader);

export default class Room extends Component {
  render() {
    return (
      <div className="room">
        <ConnectedRoomHeader />
        <div className="room-messages">
          <MessageList
            messages={this.props.messages}
          />
        </div>
        <RoomInput
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


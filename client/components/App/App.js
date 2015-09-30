import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Room from '../Room/Room.js';
import Navigation from '../Navigation/Navigation';
import Welcome from '../Welcome/Welcome';
import './App.scss';

class App extends Component {
  render() {
    const { showWelcome, room } = this.props;
    return (
      <div className="app">
        <Navigation />
        { showWelcome ?
          <Welcome /> :
          <Room room={room} />
        }
      </div>
    );
  }
}

export default connect(state => {
  const roomID = state.ui.currentRoomID;
  return {
    showWelcome: roomID === null,
    room: {
      ...state.joinedRooms[roomID],
      roomID,
    },
  };
})(App);


import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import Room from '../Room';
import Navigation from '../Navigation';
import Welcome from '../Welcome';
import './index.scss';

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


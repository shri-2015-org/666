import { connect } from 'react-redux';
import React, { Component } from 'react';
import Room from '../Room';

class RoomEntrance extends Component {
  render() {
    const { roomLoaded, room, roomID } = this.props;
    return roomLoaded ? <Room room={room}/> : (
      <div>
        <h1>Loading #{roomID}...</h1>
      </div>
    );
  }
}

export default connect(state => {
  const { roomID } = state.router.params;
  const room = state.joinedRooms[roomID];
  const roomLoaded = !!room;
  return {
    roomLoaded,
    room,
    roomID,
  };
})(RoomEntrance);


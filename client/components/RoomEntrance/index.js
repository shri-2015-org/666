import { connect } from 'react-redux';
import React, { Component } from 'react';
import Room from '../Room';

class RoomEntrance extends Component {
  render() {
    const { roomLoaded, room, roomID } = this.props;
    return roomLoaded ? <Room room={room}/> : (
      <div className="welcome">
        <article className="article">
          <h1>Loading...</h1>
          <h2>Joining #{roomID}</h2>
        </article>
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


import { connect } from 'react-redux';
import React, { Component } from 'react';
import Room from '../Room';

class RoomEntrance extends Component {
  render() {
    const { roomLoading, roomLoaded, room, roomID } = this.props;
    if (roomLoaded) {
      return <Room room={room}/>;
    } else if (roomLoading) {
      return (<div>
        <h1>Loading #{roomID}...</h1>
      </div>);
    }
    return (<div>
      <h1>You have left this room. #{roomID}</h1>
    </div>);
  }
}

export default connect(state => {
  const { roomID } = state.router.params;
  const room = state.joinedRooms[roomID];
  const roomLoading = state.joiningRooms[roomID];
  const roomLoaded = !!room;
  return {
    roomLoading,
    roomLoaded,
    room,
    roomID,
  };
})(RoomEntrance);


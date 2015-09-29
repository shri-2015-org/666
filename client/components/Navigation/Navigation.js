import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import {joinRoom} from '../../smartActions';
import './Navigation.scss';
import _ from 'lodash';

function onClick(e, handler) {
  e.preventDefault();
  handler();
}

class Navigation extends Component {
  render() {
    const { dispatch, collapsed, currentRoomID,
            joinedRooms, topRooms } = this.props;
    return (
      <nav className={
        collapsed ?
        'navigation is-collapsed' :
        'navigation'
      }>
        <div className="navigation-group">
          <input
            type="text"
            className="input--underline"
            placeholder="# Find / Create new" />
        </div>
        <div className="navigation-group">
          <h4 className="navigation-group-label"> Joined </h4>
          <ul className="navigation-group-list">
            {_.map(joinedRooms, (room, roomID) =>
              <li className={roomID === currentRoomID ? 'is-active' : ''}>
                <a href={`#!/room/#${roomID}`}>{`#${roomID}`}</a>
                <button className="reset-input">x</button>
              </li>
            )}
          </ul>
        </div>
        <div className="navigation-group">
          <h4 className="navigation-group-label"> Top Channels </h4>
          <ul className="navigation-group-list">
            {_.map(topRooms, room =>
              <li>
                <a
                  onClick={e => onClick(e, () => joinRoom(dispatch, room.roomID))}
                  href={`#!/room/#${room.roomID}`}>
                    {`#${room.roomID}`}
                </a>
                <span className="badge">9000+</span>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default connect(state => {
  const collapsed = state.ui.navigationCollapsed;
  const { currentRoomID } = state.ui;
  const { topRooms, joinedRooms } = state;
  return {
    collapsed,
    currentRoomID,
    topRooms,
    joinedRooms,
  };
})(Navigation);


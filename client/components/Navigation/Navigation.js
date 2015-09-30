import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { switchToRoom } from '../../smartActions';
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
            {_.map(joinedRooms, ({roomName}, roomID) =>
              <li className={roomID === currentRoomID ? 'is-active' : ''}>
                <a
                  onClick={e => onClick(e, () => dispatch(switchToRoom(roomID)))}
                  href={`#!/room/#${roomID}`}>{`#${roomName}`}
                </a>
                <button
                  className="reset-input"
                  onClick={() => dispatch(leaveRoom(roomID))}>
                    x
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className="navigation-group">
          <h4 className="navigation-group-label"> Top Channels </h4>
          <ul className="navigation-group-list">
            {_.map(topRooms, ({name, users, roomID}) =>
              <li>
                <a
                  onClick={e => onClick(e, () => dispatch(switchToRoom(roomID)))}
                  href={`#!/room/#${roomID}`}>
                    {`#${name}`}
                </a>
                <span className="badge">{users}</span>
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


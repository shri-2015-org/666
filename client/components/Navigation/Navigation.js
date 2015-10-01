import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { switchToRoom, leaveRoom } from '../../smartActions';
import { searchInputChange } from '../../actions';
import './Navigation.scss';
import _ from 'lodash';

function onClick(e, handler) {
  e.preventDefault();
  handler();
}

class Navigation extends Component {
  render() {
    const { dispatch, collapsed, currentRoomID,
            joinedRooms, topRooms, searchResults, searchText } = this.props;
    return (
      <nav className={
        collapsed ?
        'navigation is-collapsed' :
        'navigation'
      }>
        <div className="navigation-group">
          <input
            onChange={e => dispatch(searchInputChange(e.target.value))}
            value={searchText}
            type="text"
            className="input--underline"
            placeholder="# Find / Create new" />
        </div>
        <div className="navigation-group">
          <h4 className="navigation-group-label"> Create Room </h4>
          {`#${searchText}`}
          <br /><br />
          <h4 className="navigation-group-label"> Search Results </h4>
          <ul className="navigation-group-list">
            {_.map(searchResults, ({roomID, name, rating, users}, index) =>
              <li key={index}>
                <a
                  onClick={e => onClick(e, () => dispatch(switchToRoom(roomID)))}
                  href={`#!/room/#${roomID}`}>
                    {`#${roomID}`}
                </a>
                <span className="badge">{users}</span>
              </li>
            )}
          </ul>
          <h4 className="navigation-group-label"> Joined </h4>
          <ul className="navigation-group-list">
            {_.map(joinedRooms, ({roomName}, roomID) =>
                <li 
                  key={roomID}
                  className={roomID === currentRoomID ? 'is-active' : ''}>
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
            {_.map(topRooms, ({name, users, roomID}, index) =>
              <li key={index}>
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
  const searchResults = [{
    roomID: 'doge',
    users: 7,
    rating: 4,
    name: 'industrial dogecoin mining operation',
  }];
  const searchText = state.ui.searchInputText;
  return {
    collapsed,
    currentRoomID,
    topRooms,
    joinedRooms,
    searchResults,
    searchText,
  };
})(Navigation);


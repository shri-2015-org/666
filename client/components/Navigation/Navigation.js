import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { switchToRoom, leaveRoom,
         createRoom, searchInputChange } from '../../smartActions';
import './Navigation.scss';
import _ from 'lodash';

function onClick(e, handler) {
  e.preventDefault();
  handler();
}

class Navigation extends Component {
  render() {
    const { dispatch, collapsed, currentRoomID, shouldShowCreation,
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
          {!shouldShowCreation ? '' :
            <div>
              <h4 className="navigation-group-label"> Create Room </h4>
              <a
                onClick={e => onClick(e, () => dispatch(createRoom(searchText)))}>
                  {`#${searchText}`}
              </a>
              <br /><br />
            </div>
          }
          {searchResults === null ? '' :
            <div>
              <h4 className="navigation-group-label"> Search Results </h4>
              <ul className="navigation-group-list">
                {_.map(searchResults, ({roomID, name, rating, users}, index) =>
                  <li key={index}>
                    <a
                      onClick={e => onClick(e, () => dispatch(switchToRoom(roomID)))}
                      title={name}
                      href={`#!/room/#${roomID}`}>{`#${roomID}`}
                    </a>
                    <span className="badge">{users}</span>
                  </li>
                )}
              </ul>
            </div>
          }
          <h4 className="navigation-group-label"> Joined </h4>
          <ul className="navigation-group-list">
            {_.map(joinedRooms, ({roomName: name}, roomID) =>
                <li 
                  key={roomID}
                  className={roomID === currentRoomID ? 'is-active' : ''}>
                <a
                  onClick={e => onClick(e, () => dispatch(switchToRoom(roomID)))}
                  title={name}
                  href={`#!/room/#${roomID}`}>{`#${roomID}`}
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
                  title={name}
                  href={`#!/room/#${roomID}`}>{`#${roomID}`}
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
  const searchResults = state.ui.searchResults;
  const searchText = state.ui.searchInputText;
  const shouldShowCreation =
    searchText.length > 0 &&
    searchResults &&
    !(
      searchResults[0] &&
      searchText === searchResults[0].roomID
    );



  return {
    collapsed,
    currentRoomID,
    topRooms,
    joinedRooms,
    searchResults,
    searchText,
    shouldShowCreation,
  };
})(Navigation);


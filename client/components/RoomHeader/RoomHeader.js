import { toggleNavigation } from '../../actions';
import React, { Component } from 'react';
import './RoomHeader.scss';

export default class RoomHeader extends Component {
  collapseNavigation(e, dispatch) {
    const action = toggleNavigation();
    dispatch(action);
  }

  render() {
    const { dispatch } = this.props;

    return (
      <header className="room-header">
        <div onClick={e => this.collapseNavigation(e, dispatch)} className="room-header-bar">
            <span className="btn-icon">{this.props.collapsed ? '←' : '→'}</span>
            <h3 className="room-name"><a href="#!/room/#frontend">#frontend</a></h3>
        </div>
        <div className="room-header-bar">
          <h4 className="user-name">UserName</h4>
          <div className="user-ava ava"
           style={{'background-color': '#73DD40'}}>
            <img src="media/icons/airplane.svg" alt="" />
          </div>
        </div>
      </header>
    );
  }
}

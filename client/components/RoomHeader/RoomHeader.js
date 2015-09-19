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
        <ul onClick={e => this.collapseNavigation(e, dispatch)} className="room-header-bar">
          <li><span className="btn-icon">{this.props.collapsed ? '←' : '→'}</span></li>
          <li><h3 className="room-name"><a href="#!/room/#frontend">#frontend</a></h3></li>
        </ul>
        <ul className="room-header-bar">
          <li><h4 className="user-name">UserName</h4></li>
          <li>
            <div className="user-ava ava"
             style={{'background-color': '#73DD40'}}>
                <img src="media/icons/airplane.svg" alt="" />
            </div>
          </li>
        </ul>
      </header>
    );
  }
}

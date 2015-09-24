import { toggleNavigation } from '../../actions';
import React, { Component } from 'react';
import './RoomHeader.scss';

export default class RoomHeader extends Component {
  toggleNavigation(e, dispatch) {
    const action = toggleNavigation();
    dispatch(action);
  }

  render() {
    const { dispatch } = this.props;

    return (
      <header className="room-header">
        <ul onClick={e => this.toggleNavigation(e, dispatch)} className="room-header-bar">
          <li className="room-header-bar-item">
            <i className={this.props.collapsed ? 'iconNav' : 'iconNav is-hidden'}>
              <b className="iconNav-line"></b>
              <b className="iconNav-line"></b>
              <b className="iconNav-line"></b>
            </i>
          </li>
          <li className="room-header-bar-item">
            <h3 className="room-name"><a href="#!/room/#frontend">#frontend</a></h3>
          </li>
        </ul>
        <ul className="room-header-bar">
            <li><h4 className="user-name">{this.props.login.name}</h4></li>
            <li>
              <div className="user-ava ava" style={{backgroundImage: `url( ${ this.props.login.avatar } )` }}></div>
            </li>
          </ul>
      </header>
    );
  }
}

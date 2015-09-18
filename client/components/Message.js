import { Str } from '~/common/utils/invariants';
import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    return (
      <li className="message">
        <div className="message-meta">
          <p className="user-name">EpicPlane</p>
          <time className="message-time">14:25</time>
        </div>
        <div className="message-content">
          <div className="message-content-ava ava"
            style={{'background-color': '#73DD40'}}>
            <img src="media/icons/airplane.svg" alt="" />
          </div>
          <div className="message-content-text bubble">
            <p>{this.props.text}</p>
          </div>
        </div>
      </li>
    );
  }
}

Message.propTypes = {
  text: Str,
};

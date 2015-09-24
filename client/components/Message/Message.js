import React, { Component, PropTypes } from 'react';
import './Message.scss';

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
            style={{'background-image': 'url(media/icons/water.svg)'}}>
          </div>
          <div className="message-content-text bubble">
            <p className="message-content-text-p">{this.props.text}</p>
          </div>
        </div>
      </li>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

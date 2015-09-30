import React, { Component, PropTypes } from 'react';
import './Message.scss';

export default class Message extends Component {
  render() {
    const {time, nick, avatar, text } = this.props.message;
    const date = new Date(time);
    const humanTime = `${date.getHours()}:${date.getMinutes()}`;
    return (
      <li className="message">
        <div className="message-meta">
          <p className="user-name">{nick}</p>
          <time className="message-time">{humanTime}</time>
        </div>
        <div className="message-content">
          <div className="message-content-ava ava"
            style={{'backgroundImage': `url(${avatar})`}}>
          </div>
          <div className="message-content-text bubble">
            <p className="message-content-text-p">{text}</p>
          </div>
        </div>
      </li>
    );
  }
}


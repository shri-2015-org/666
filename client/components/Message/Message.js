import React, { Component } from 'react';
import './Message.scss';

export default class Message extends Component {
  render() {
    const { time, nick, avatar, text, status } = this.props.message;
    const date = new Date(time);
    const humanTime = `${date.getHours()}:${date.getMinutes()}`;
    let style = undefined;
    if (status === 'sent') style = {opacity: 1};
    if (status === 'rejected') style = {opacity: 0.5};

    return (
      // TODO highlight 'myself'
      <li className="message">
        <div className="message-meta">
          <p className="user-name">{nick}</p>
          <time className="message-time">{humanTime}</time>
        </div>
        <div className="message-content">
          <div className="message-content-ava ava"
            style={{'backgroundImage': `url(${avatar})`}}>
          </div>
          <div className="message-content-text bubble"
            style={style}>
            <p className="message-content-text-p">{text}</p>
          </div>
        </div>
      </li>
    );
  }
}


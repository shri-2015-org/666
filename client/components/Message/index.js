import React, { Component } from 'react';
import './index.scss';
import md from '../../../common/md';
import emoji from '../../../common/emoji';

export default class Message extends Component {
  render() {
    const { time, nick, avatar, text, status } = this.props.message;
    const date = new Date(time);
    const htmlString = md(emoji(text));
    const humanTime = `${date.getHours()}:${date.getMinutes()}`;

    let style;
    if (status === 'sent') style = {opacity: 1};
    if (status === 'rejected') style = {opacity: 0.5};

    return (
      // TODO highlight 'myself'
      <li className="message" style={style}>
        <div className="message-meta">
          <p className="user-name">{nick}</p>
          <time className="message-time">{humanTime}</time>
        </div>
        <div className="message-content">
          <div className="message-content-ava ava"
            style={{'backgroundImage': `url(${avatar})`}}>
          </div>
          <div className="message-content-text bubble">
            <article className="md"
              dangerouslySetInnerHTML={{ __html: htmlString }} />
          </div>
        </div>
      </li>
    );
  }
}


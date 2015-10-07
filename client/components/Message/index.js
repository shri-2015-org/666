import React, { Component } from 'react';
import MessageBody from '../MessageBody';
import './index.scss';
import OpenGraph from '../OpenGraph';

export default class Message extends Component {
  render() {
    const { attachments, time, nick, avatar, text, status } = this.props.message;
    const date = new Date(time);
    const humanTime = `${date.getHours()}:${date.getMinutes()}`;
    const finalTime = status === 'preview' ? '(preview)' : humanTime;

    let msgStyle;
    if (status === 'sent') msgStyle = {opacity: 1};
    if (status === 'rejected') msgStyle = {opacity: 0.5};

    const avaStyle = avatar === null ? {} :
      {'backgroundImage': `url(${avatar})`};

    return (
      // TODO highlight 'myself'
      <li className="message" style={msgStyle}>
        <div className="message-meta">
          <p className="user-name">{nick}</p>
          <time className="message-time">{finalTime}</time>
        </div>
        <div className="message-content">
          <div className="message-content-ava ava"
            style={avaStyle}>
          </div>
          <div className="message-content-text bubble">
            <MessageBody text={text} />
            { attachments.map((atta, index) =>
              <OpenGraph key={index} meta={atta.meta.data} />) }
          </div>
        </div>
      </li>
    );
  }
}


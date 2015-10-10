import React, { Component } from 'react';
import MessageBody from '../MessageBody';
import './index.scss';
import OpenGraph from '../OpenGraph';

export default class Message extends Component {
  render() {
    const { attachments, time, nick, avatar, text, status } = this.props.message;
    const date = new Date(time);
    const humanTime = `${date.getHours()}:${date.getMinutes()}`;
    const finalTime = status === 'confirmed' ? humanTime : `${ status }`;
    const msgClass = `message message--${ status }`;

    const avaStyle = avatar === null ? {} :
      {'backgroundImage': `url(${avatar})`};

    return (
      // TODO highlight 'myself'
      <li className={msgClass}>
        <div className="message-meta">
          <p className="user-name">{nick}</p>
          <time className="message-time">{finalTime}</time>
        </div>
        <div className="message-content">
          <div className="message-content-ava ava" style={avaStyle} />
          <div className="message-content-text bubble">
            <MessageBody text={text} />
              <div className="attachments">
            { attachments.map((atta, index) =>
              <OpenGraph key={index} meta={atta.meta.data} />) }
              </div>
          </div>
        </div>
      </li>
    );
  }
}


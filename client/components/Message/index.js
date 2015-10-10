import React, { Component } from 'react';
import MessageBody from '../MessageBody';
import './index.scss';
import OpenGraph from '../OpenGraph';

export default class Message extends Component {
  render() {
    const { attachments, time, nick, avatar, text, status, isOurMessage } = this.props.message;
    const date = new Date(time);
    const humanTime = `${date.getHours()}:${date.getMinutes()}`;
    const finalTime = status === 'confirmed' ? humanTime : `${ status }`;
    const ourMessageClass = (isOurMessage) ? 'message--myself' : '';
    const messageClass = `message message--${ status } ${ ourMessageClass }`;

    const avaStyle = avatar === null ? {} :
      {'backgroundImage': `url(${avatar})`};

    return (
      // TODO highlight 'myself'
      <li className={messageClass}>
        <div className="message-meta">
          <p className="user-name">{nick}</p>
          <time className="message-time">{finalTime}</time>
        </div>
        <div className="message-content">
          <div className="message-content-ava">
            <div className="ava" style={avaStyle} />
          </div>
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


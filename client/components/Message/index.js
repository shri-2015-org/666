import React, { Component } from 'react';
import './index.scss';
import MessageParser from '../MessageParser';
import OpenGraph from '../OpenGraph';

export default class Message extends Component {
  render() {
    const { attachments, time, nick, avatar, text, status } = this.props.message;
    const date = new Date(time);
    const htmlText = MessageParser.process(text).emoji().md().result;
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
            <article className="md" dangerouslySetInnerHTML={{ __html: htmlText }} />
            { attachments.map((atta, index) =>
              <OpenGraph key={index} meta={atta.meta.data} />) }
          </div>
        </div>
      </li>
    );
  }
}


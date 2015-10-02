import React, { Component, PropTypes } from 'react';
import './Welcome.scss';

export default class extends Component {
  render() {
    return (
      <div className="welcome">
        <article className="article">
          <h1>Welcome</h1>
          <h2>Make yourself at home</h2>
          <p>Join a channel and find your new identity.</p>
        </article>
        <article className="article faded">
          <p><i className="iconShuffle"></i></p>
          <p><button className="btn btn--outline">Join random channel</button></p>
        </article>
      </div>
    );
  }
}


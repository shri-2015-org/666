import React, { Component } from 'react';
import './api';

const URL = /^https?:\/\/twitter.com\/.*\/(\d+)/;

class Twitter extends Component {
  componentDidMount() {
    const { status } = this.props;
    twttr.widgets.createTweet(status, this.myTweet.getDOMNode());
  }

  render() {
    return <span ref={ref => this.myTweet = ref}></span>;
  }
}

export default meta => {
  if (!URL.exec(meta.ogUrl)) {
    return false;
  }

  return <Twitter status={RegExp.$1}/>;
};

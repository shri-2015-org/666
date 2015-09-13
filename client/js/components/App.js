import React, { Component, PropTypes } from 'react';
import { messagesT } from '../propTypes';
import Room from './Room';

export default class App extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Room
        messages={this.props.messages}
        onSend={text => this.props.addMessage(text)}
      />
    );
  }
}

App.propTypes = {
  messages: messagesT,
};


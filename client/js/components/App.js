import React, { Component, PropTypes } from 'react';
import { messagesT } from '../propTypes';
import { sendMessage } from '../actions';
import Room from './Room';

export default class App extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Room
        messages={this.props.messages}
        onSend={text => dispatch(sendMessage(text))}
      />
    );
  }
}

App.propTypes = {
  messages: messagesT,
};

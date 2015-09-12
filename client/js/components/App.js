import React, { Component, PropTypes } from 'react';
import { messagesT } from '../propTypes';
import { addMessagePending } from '../actions';
import Room from './Room';

export default class App extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <Room
        messages={this.props.messages}
        onSend={text => dispatch(addMessagePending(text))}
      />
    );
  }
}

App.propTypes = {
  messages: messagesT
};

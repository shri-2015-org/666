import React, { Component, PropTypes } from 'react';
import { messagesT } from '../propTypes';
import { addMessage } from '../operations';
import Room from './Room';

export default class App extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div className="app">
        <Room
          messages={this.props.messages}
          onSend={text => addMessage(text)}
        />
      </div>
    );
  }
}

App.propTypes = {
  messages: messagesT,
};

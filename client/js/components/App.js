import React, { Component, PropTypes } from 'react';
import { messagesT } from '../propTypes';
import Room from './Room';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Room
          messages={this.props.messages}
          addMessage={this.props.addMessage}
        />
      </div>
    );
  }
}

App.propTypes = {
  addMessage: PropTypes.func.isRequired,
  messages: messagesT,
};


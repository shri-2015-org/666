import React, { Component } from 'react';
import { addMessage } from '../operations';
import Room, { MessagesT } from './Room';

export default class App extends Component {
  render() {
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
  messages: MessagesT,
};

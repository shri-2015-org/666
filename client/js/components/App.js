import React, { Component } from 'react';
import Room, { MessagesT, OnAddMessageT } from './Room';
export { OnAddMessageT } from './Room';

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
  addMessage: OnAddMessageT,
  messages: MessagesT,
};


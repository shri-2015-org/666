import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { messagesT } from '../../propTypes';
import Room from '../Room/Room.js';
import Navigation from '../Navigation/Navigation';
import './App.scss';

const ConnectedNavigation = connect(state => ({collapsed: state.navigation}))(Navigation);

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <ConnectedNavigation />
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


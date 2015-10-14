import React, { Component } from 'react';
import Navigation from '../Navigation';
import Welcome from '../Splashes/Welcome';
import './index.scss';

export default class extends Component {
  render() {
    const { children, history } = this.props;
    return (
      <div className="app">
        <Navigation history={history} />
        {children ? children : <Welcome/>}
      </div>
    );
  }
}


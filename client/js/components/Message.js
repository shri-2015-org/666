import React, { Component, PropTypes } from 'react';

export default class Message extends Component {
  render() {
    const { dispatch } = this.props;
    return (
      <li>
        {this.props.text}
      </li>
    );
  }
}

Message.propTypes = {
  text: PropTypes.string.isRequired,
};

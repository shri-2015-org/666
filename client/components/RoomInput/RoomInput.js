import React, { findDOMNode, Component, PropTypes } from 'react';

export default class RoomInput extends Component {

  sendMessage(e) {
    const node = findDOMNode(this.refs.input);
    const text = node.value;
    this.props.onSend(text);
    node.value = '';

    e.preventDefault();
  }

  render() {
    return (
      <form className="room-actions" onSubmit={e => this.sendMessage(e)}>
        <input
          type="text"
          ref="input"
          placeholder="Message..."
          className="room-actions-input input"
        />
        <button
          className="room-actions-send btn"
          type="submit"
        > Send </button>
      </form>
    );
  }
}

RoomInput.propTypes = {
  onSend: PropTypes.func.isRequired,
};


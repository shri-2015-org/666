import React, { findDOMNode, Component, PropTypes } from 'react';

export default class Input extends Component {

  handleClick() {
    const node = findDOMNode(this.refs.input);
    const text = node.value;
    this.props.onSend(text);
    node.value = '';
  }

  render() {
    return (
      <div className="room-actions">
        <input
          type="text"
          ref="input"
          placeholder="Message..."
          className="room-actions-input input"
        />
        <button
          className="room-actions-send btn"
          type="button"
          onClick={e => this.handleClick(e)}
        > Send </button>
      </div>
    );
  }
}

Input.propTypes = {
  onSend: PropTypes.func.isRequired,
};


import React, { findDOMNode, Component } from 'react';

function onKeyPress(e, handler) {
  if (e.which === 13 && !e.shiftKey) {
    e.preventDefault();
    handler();
  }
}

function onSubmit(e, handler) {
  e.preventDefault();
  handler();
}

export default class extends Component {
  componentDidUpdate() {
    const textarea = findDOMNode(this.refs.textarea);
    textarea.style.height = '';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  render() {
    const { onSend, onChange, text, buttonEnabled } = this.props;
    return (
      <form className="room-actions" onSubmit={e => onSubmit(e, onSend)}>
        <textarea
          type="text"
          ref="textarea"
          placeholder="Message..."
          className="room-actions-input input"
          onChange={e => onChange(e.target.value)}
          onKeyPress={e => onKeyPress(e, onSend)}
          rows="1"
          value={text}
        ></textarea>
        <button
          className="room-actions-send btn"
          type="submit"
          ref="submitBtn"
          disabled={!buttonEnabled}
        > Send </button>
      </form>
    );
  }
}


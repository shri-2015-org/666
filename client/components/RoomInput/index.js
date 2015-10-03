import React, { findDOMNode, Component } from 'react';

export default class RoomInput extends Component {

  sendMessage() {
    const $input = findDOMNode(this.refs.input);
    const $submitBtn = findDOMNode(this.refs.submitBtn);
    const text = $input.value;
    if (text !== '') {
      this.props.onSend(text);
      $input.value = '';
      $submitBtn.disabled = true;
    }
  }

  submitMessage(e) {
    this.sendMessage();
    e.preventDefault();
  }

  keyPress(e) {
    if (e.which === 13 && !e.shiftKey) {
      this.sendMessage();
      e.preventDefault();
    }
  }

  keyUp() {
    const $input = findDOMNode(this.refs.input);
    const $submitBtn = findDOMNode(this.refs.submitBtn);

    $submitBtn.disabled = ($input.value === '');

    $input.style.height = '';
    $input.style.height = `${ $input.scrollHeight }px`;
  }

  render() {
    return (
      <form className="room-actions" onSubmit={e => this.submitMessage(e)}>
        <textarea
          type="text"
          ref="input"
          placeholder="Message..."
          className="room-actions-input input"
          onKeyUp={e => this.keyUp(e)}
          onKeyPress={e => this.keyPress(e)}
          rows="1"
        ></textarea>
        <button
          className="room-actions-send btn"
          type="submit"
          ref="submitBtn"
          disabled
        > Send </button>
      </form>
    );
  }
}


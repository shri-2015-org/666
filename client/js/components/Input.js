import React, { findDOMNode, Component, PropTypes } from 'react';

export default class Input extends Component {

  handleClick() {
    const node = findDOMNode(this.refs.input);
    const text = node.value;
    this.props.onClick(text);
    node.value = '';
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <input type="text" ref="input" />
        <button onClick={e => this.handleClick(e)}>
          Послать!
        </button>
      </div>
    );
  }
}

Input.propTypes = {
  onClick: PropTypes.func.isRequired,
};


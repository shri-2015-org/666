import React, { Component } from 'react';
import md from '../../../common/md';
import emoji from '../../../common/emoji';

export default class extends Component {
  render() {
    const { text } = this.props;
    const htmlString = md(emoji(text));
    return (
      <article className="md"
        dangerouslySetInnerHTML={{ __html: htmlString }} />
    );
  }
}


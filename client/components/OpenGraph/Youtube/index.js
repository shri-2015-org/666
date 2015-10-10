import React, { Component } from 'react';
import './index.scss';

const WATCH_REGEX = /http:\/\/www.youtube.com\/watch\?v=(.+)/;

class Youtube extends Component {
  render() {
    const { url } = this.props;
    return (
      <div className="attachment attachment--video">
        <iframe width={640} height={360}
          src={url} frameBorder="0" allowFullScreen>
        </iframe>
      </div>
    );
  }
}

export default meta => {
  if (meta.ogSiteName !== 'YouTube') return false;

  // К сожалению, сразу embed ссылки в этих данных нету.
  const matches = meta.ogUrl.match(WATCH_REGEX);
  if (!matches || matches.length !== 2) return false;
  const url = `https://www.youtube.com/embed/${matches[1]}`;

  return <Youtube url={url} />;
};

import React, { Component } from 'react';

class Generic extends Component {
  render() {
    const { imageUrl, title, link } = this.props;
    return (
    <figure className="attachment">
      <figcaption className="attachment-caption article">
        <a href={link} target="_blank">
          <h4 className="attachment-caption-title">{ title }</h4>
        </a>
      </figcaption>
      {(!!imageUrl) ? (
        <a href={link} target="_blank">
          <img src={imageUrl} className="attachment-image" />
        </a>
      ) : false }
    </figure>);
  }
}

export default meta => {
  const image = meta.ogImage;
  const title = meta.ogTitle;
  const link = meta.ogUrl;

  return (image) ?
    (<Generic imageUrl={image.url} title={title} link={link} />) :
    false;
};


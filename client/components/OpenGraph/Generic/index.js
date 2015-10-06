import React, { Component } from 'react';

class Generic extends Component {
  render() {
    const { imageUrl, title } = this.props;
    return (
    <div>
      <span>{ title }</span>
      <img height={200} src={imageUrl} />
    </div>);
  }
}

export default meta => {
  const image = meta.ogImage;
  const title = meta.ogTitle;
  if (image) {
    return (
      <Generic imageUrl={image.url} title={title} />
    );
  }
};


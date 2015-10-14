import { Component } from 'react';
import generic from './Generic';
import twitter from './Twitter';
import youtube from './Youtube';
import './index.scss';

const plugins = [
  youtube,
  twitter,
  generic,
];

export default class extends Component {
  render() {
    const { meta } = this.props;
    return plugins.reduce(
      (result, plugin) => result || plugin(meta), null);
  }
}

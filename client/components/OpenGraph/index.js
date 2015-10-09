import { Component } from 'react';
import generic from './Generic';
import youtube from './Youtube';
import './index.scss';

const plugins = [
  youtube,
  generic,
];

export default class extends Component {
  render() {
    const { meta } = this.props;
    return plugins.reduce(
      (result, plugin) => result || plugin(meta), null);
  }
}

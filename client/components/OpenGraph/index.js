import { Component } from 'react';
import generic from './Generic';

const plugins = [
  generic,
];

export default class extends Component {
  render() {
    const { meta } = this.props;
    return plugins.reduce(
      (result, plugin) => result || plugin(meta), null);
  }
}

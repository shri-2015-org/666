import React, { Component, PropTypes } from 'react';
import './Navigation.scss';

export default class Navigation extends Component {
  render() {
    return (
      <nav className={this.props.collapsed ? 'navigation' : 'navigation is-collapsed'}>
        <div className="navigation-group">
          <input
            type="text"
            className="input--underline"
            placeholder="# Find / Create new" />
        </div>
        <div className="navigation-group">
          <h4 className="navigation-group-label"> Joined </h4>
          <ul className="navigation-group-list">
            <li>
              <a href="#!/room/#webdev">#webdev </a> <button className="reset-input">x</button>
            </li>
            <li className="is-active">
              <a href="#!/room/#frontend">#frontend </a> <button className="reset-input">x</button>
            </li>
            <li>
              <a href="#!/room/#react_fun_club">#react_fun_club</a> <button className="reset-input">x</button>
            </li>
            <li>
              <a href="#!/room/#css_geeks">#css_geeks</a> <button className="reset-input">x</button>
            </li>
          </ul>
        </div>
        <div className="navigation-group">
          <h4 className="navigation-group-label"> Top Channels </h4>
          <ul className="navigation-group-list">
            <li>
              <a href="#!/room/#webdev">#webdev</a> <span className="badge">9000+</span>
            </li>
            <li>
              <a href="#!/room/#frontend">#frontend</a> <span className="badge">30</span>
            </li>
            <li>
              <a href="#!/room/#react_fun_club">#react_fun_club</a>
            </li>
            <li>
              <a href="#!/room/#css_geeks">#css_geeks</a>
            </li>
            <li>
              <a href="#!/room/#webdev">#webdev</a>
            </li>
            <li>
              <a href="#!/room/#frontend">#frontend</a>
            </li>
            <li>
              <a href="#!/room/#react_fun_club">#react_fun_club</a>
            </li>
            <li>
              <a href="#!/room/#css_geeks">#css_geeks</a>
            </li>
            <li>
              <a href="#!/room/#webdev">#webdev</a>
            </li>
            <li>
              <a href="#!/room/#frontend">#frontend</a>
            </li>
            <li>
              <a href="#!/room/#react_fun_club">#react_fun_club</a>
            </li>
            <li>
              <a href="#!/room/#css_geeks">#css_geeks</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

Navigation.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};

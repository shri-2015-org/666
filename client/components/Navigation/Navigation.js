import React, { Component } from 'react';
import './Navigation.scss';

export default class Navigation extends Component {
  render() {
    return (
      <nav className="navigation">
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
        <div className="navigation-group">
          <h4 className="navigation-group-label"> Top Channels </h4>
          <ul className="navigation-group-list">
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

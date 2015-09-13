const React = require('react');
const HelloView = require('./views/index.js');

const initialize = function() {
  React.render(
  <HelloView />,
    document.getElementById('content')
  );
};

module.exports = initialize;

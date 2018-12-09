'use strict';

var contentNode = document.getElementById('app');
var component = React.createElement(
  'h1',
  null,
  'coming soon!'
);
ReactDOM.render(component, contentNode);
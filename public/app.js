'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('app');

var Test = function (_React$Component) {
	_inherits(Test, _React$Component);

	function Test() {
		_classCallCheck(this, Test);

		return _possibleConstructorReturn(this, (Test.__proto__ || Object.getPrototypeOf(Test)).apply(this, arguments));
	}

	_createClass(Test, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'h1',
				{ id: 'first' },
				'1st component'
			);
		}
	}]);

	return Test;
}(React.Component);

var Test2 = function (_React$Component2) {
	_inherits(Test2, _React$Component2);

	function Test2() {
		_classCallCheck(this, Test2);

		return _possibleConstructorReturn(this, (Test2.__proto__ || Object.getPrototypeOf(Test2)).apply(this, arguments));
	}

	_createClass(Test2, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'h1',
				{ id: 'second' },
				'2nd component'
			);
		}
	}]);

	return Test2;
}(React.Component);

var Test3 = function (_React$Component3) {
	_inherits(Test3, _React$Component3);

	function Test3() {
		_classCallCheck(this, Test3);

		return _possibleConstructorReturn(this, (Test3.__proto__ || Object.getPrototypeOf(Test3)).apply(this, arguments));
	}

	_createClass(Test3, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'h1',
				{ id: 'third' },
				'3rd component'
			);
		}
	}]);

	return Test3;
}(React.Component);

var App = function (_React$Component4) {
	_inherits(App, _React$Component4);

	function App() {
		_classCallCheck(this, App);

		return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	}

	_createClass(App, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(Test, null),
				React.createElement(Test2, null),
				React.createElement(Test3, null)
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), contentNode);
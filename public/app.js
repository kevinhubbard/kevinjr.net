'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var contentNode = document.getElementById('app');

var Navbar = function (_React$Component) {
	_inherits(Navbar, _React$Component);

	function Navbar() {
		_classCallCheck(this, Navbar);

		return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
	}

	_createClass(Navbar, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					{ id: 'navigation' },
					'Navbar component'
				),
				React.createElement('br', null)
			);
		}
	}]);

	return Navbar;
}(React.Component);

var Bio = function (_React$Component2) {
	_inherits(Bio, _React$Component2);

	function Bio() {
		_classCallCheck(this, Bio);

		return _possibleConstructorReturn(this, (Bio.__proto__ || Object.getPrototypeOf(Bio)).apply(this, arguments));
	}

	_createClass(Bio, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'bio' },
				React.createElement(
					'h1',
					null,
					'Biography component'
				)
			);
		}
	}]);

	return Bio;
}(React.Component);

var Social = function (_React$Component3) {
	_inherits(Social, _React$Component3);

	function Social() {
		_classCallCheck(this, Social);

		return _possibleConstructorReturn(this, (Social.__proto__ || Object.getPrototypeOf(Social)).apply(this, arguments));
	}

	_createClass(Social, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'social' },
				React.createElement(
					'h3',
					null,
					'Connect With Me'
				),
				React.createElement(
					'ul',
					null,
					React.createElement(
						'li',
						{ className: 'link' },
						React.createElement(
							'a',
							{ href: 'https://www.linkedin.com/in/kevin-hubbard-jr' },
							React.createElement('img', { src: 'images/linkedIn.png' })
						)
					),
					React.createElement(
						'li',
						{ className: 'link' },
						React.createElement(
							'a',
							{ href: 'https://github.com/kevinhubbard' },
							React.createElement('img', { src: 'images/gitHub.png' })
						)
					),
					React.createElement(
						'li',
						{ className: 'link' },
						React.createElement(
							'a',
							{ href: 'https://stackoverflow.com' },
							React.createElement('img', { src: 'images/stackOverflow.png' })
						)
					)
				)
			);
		}
	}]);

	return Social;
}(React.Component);

var Toolbox = function (_React$Component4) {
	_inherits(Toolbox, _React$Component4);

	function Toolbox() {
		_classCallCheck(this, Toolbox);

		return _possibleConstructorReturn(this, (Toolbox.__proto__ || Object.getPrototypeOf(Toolbox)).apply(this, arguments));
	}

	_createClass(Toolbox, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'tools' },
				React.createElement(
					'h2',
					null,
					'Tool box'
				)
			);
		}
	}]);

	return Toolbox;
}(React.Component);

var Mainbody = function (_React$Component5) {
	_inherits(Mainbody, _React$Component5);

	function Mainbody() {
		_classCallCheck(this, Mainbody);

		return _possibleConstructorReturn(this, (Mainbody.__proto__ || Object.getPrototypeOf(Mainbody)).apply(this, arguments));
	}

	_createClass(Mainbody, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				{ id: 'bod', className: 'container' },
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(
						Bio,
						{ className: 'col-md' },
						React.createElement(
							'p',
							null,
							'bio bs will go here'
						)
					),
					React.createElement(Social, { className: 'col-md' })
				),
				React.createElement(
					'div',
					{ className: 'row' },
					React.createElement(Toolbox, { className: 'col-md' })
				),
				React.createElement(Form, null)
			);
		}
	}]);

	return Mainbody;
}(React.Component);

var Form = function (_React$Component6) {
	_inherits(Form, _React$Component6);

	function Form() {
		_classCallCheck(this, Form);

		return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
	}

	_createClass(Form, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'form',
				{ action: '/', method: 'POST' },
				React.createElement(
					'fieldset',
					null,
					React.createElement(
						'legend',
						null,
						'Basic Info:'
					),
					React.createElement(
						'label',
						{ htmlFor: 'name' },
						'Name:'
					),
					React.createElement('input', { name: 'name', id: 'name', type: 'text' }),
					React.createElement('br', null),
					React.createElement(
						'label',
						{ htmlFor: 'email' },
						'Email:'
					),
					React.createElement('input', { name: 'email', id: 'email', type: 'email' }),
					React.createElement('br', null),
					React.createElement(
						'label',
						{ htmlFor: 'age' },
						'Age:'
					),
					React.createElement('input', { name: 'age', id: 'age', type: 'number', min: '18', max: '99' }),
					React.createElement('br', null),
					React.createElement(
						'label',
						{ htmlFor: 'submit' },
						' Submit:'
					),
					React.createElement('input', { id: 'submit', type: 'submit', value: 'Submit' })
				)
			);
		}
	}]);

	return Form;
}(React.Component);

var Footer = function (_React$Component7) {
	_inherits(Footer, _React$Component7);

	function Footer() {
		_classCallCheck(this, Footer);

		return _possibleConstructorReturn(this, (Footer.__proto__ || Object.getPrototypeOf(Footer)).apply(this, arguments));
	}

	_createClass(Footer, [{
		key: 'render',
		value: function render() {
			return React.createElement(
				'footer',
				null,
				'\xA9Kevin Jr ',
				new Date().getFullYear()
			);
		}
	}]);

	return Footer;
}(React.Component);

var App = function (_React$Component8) {
	_inherits(App, _React$Component8);

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
				React.createElement(Navbar, null),
				React.createElement(Mainbody, null),
				React.createElement(Footer, null)
			);
		}
	}]);

	return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), contentNode);
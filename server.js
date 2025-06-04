const express = require('express');
const exphbs = require('express-handlebars');
const expressRobotsMiddleware = require('express-robots-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const sessionString = require('./config.js').sessionString;

// DEFINES APP METHOD
const app = express();

// LETS EXPRESS USE STATIC FILES
app.use(express.static('node_modules'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', require('cors')());

// DEFINES PORT
const PORT = process.env.PORT || 3000;

// SETS HANDLEBARS AS OUR MAIN VIEW ENGINE AND USES MAIN AS DEFAULT LAYOUT
app.engine('handlebars', exphbs.engine({
	defaultLayout: 'main',
	helpers: {
		ifEquals: function (arg1, arg2, options) {
			if (arg1 === arg2) {
				return options.fn(this);
			} else {
				return options.inverse(this);
			}
		}
	}
}));
app.set('view engine', 'handlebars');

// ROBOTS.TXT MIDDLEWARE
const robotsMiddleware = expressRobotsMiddleware([{
	UserAgent: '*',
	Disallow: ['/admin','/thankyou'],
	Allow: ['/', '/blog', '/contact', '/portfolio', '/resume'],
	CrawlDelay: '5'
}]);

// ROBOTS.TXT ROUTE
app.get('/robots.txt', robotsMiddleware);

// INITIALIZE USER SESSION
app.use(session({
	secret: process.env.SESSION_SECRET || sessionString,
	resave: false,
	saveUninitialized: false,
	cookie: {secure: false}
}));

// ROUTES
app.use('/', require('./controllers/index'));
app.use('/admin', require('./controllers/admin'));
app.use('/contact', require('./controllers/contact'));
app.use('/portfolio', require('./controllers/portfolio'));
app.use('/resume', require('./controllers/resume'));
app.use('/thankyou', require('./controllers/thankyou'));
app.use('/golfcard', require('./controllers/golfcard'));
app.use('/botw', require('./controllers/botw'));
app.use('/brpaints', require('./controllers/brpaints'));
app.use('/workout', require('./controllers/workout'));
app.use('/meals', require('./controllers/meals'));
app.use('/blog', require('./controllers/blog'));
app.use('/signup', require('./controllers/signup'));
app.use('/profile', require('./controllers/profile'));


// 404 CATCH
app.use(function (req, res, next) {
	res.status(404).render('404',{
		css: ['style.css', 'error.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

// START SERVER LISTENING
app.listen(PORT, function () {
	console.log('App listening on port: ' + PORT);
});
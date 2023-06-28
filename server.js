// PACKAGES REQUIRED
var express = require('express');
var exphbs = require('express-handlebars');
var expressRobotsMiddleware = require('express-robots-middleware');
var path = require('path');
var bodyParser = require('body-parser');

// DEFINES APP METHOD
var app = express();

// LETS EXPRESS USE STATIC FILES
app.use(express.static('node_modules'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// DEFINES PORT
var PORT = process.env.PORT || 3000;

//SETS HANDLEBARS AS OUR MAIN VIEW ENGINE AND USES MAIN AS DEFAULT LAYOUT
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ROBOTS.TXT MIDDLEWARE
var robotsMiddleware = expressRobotsMiddleware([{
	UserAgent: '*',
	Disallow: ['/admin','/thankyou'],
	Allow: ['/', '/blog', '/contact', '/portfolio', '/resume'],
	CrawlDelay: '5'
}]);

// ROBOTS.TXT ROUTE
app.get('/robots.txt', robotsMiddleware);

// ROUTES
app.use('/', require('./controllers/index'));
app.use('/contact', require('./controllers/contact'));
app.use('/portfolio', require('./controllers/portfolio'));
app.use('/resume', require('./controllers/resume'));
app.use('/thankyou', require('./controllers/thankyou'));
app.use('/golfcard', require('./controllers/golfcard'));
app.use('/botw', require('./controllers/botw'));

// 404 CATCH
app.use(function (req, res, next) {
	res.status(404).render('404',{
		css: ['style.css', 'error.css']
	});
});

// START SERVER LISTENING
app.listen(PORT, function () {
	console.log('App listening on port: ' + PORT);
});
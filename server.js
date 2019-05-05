//PACKAGES REQUIRED FOR EXPRESS SERVER AND HANDLEBARS TEMPLATING 
var express = require('express');
var exphbs = require('express-handlebars');
var expressRobotsMiddleware = require('express-robots-middleware');
var path = require('path');
var bodyParser = require('body-parser');

//Require routes
var index = require('./routes/index');
var admin = require('./routes/admin');
var blog = require('./routes/blog');
var contact = require('./routes/contact');
var portfolio = require('./routes/portfolio');
var resume = require('./routes/resume');
var thankyou = require('./routes/thankyou');

//DEFINES APP METHOD
var app = express();

//LETS EXPRESS USE STATIC FILES
app.use(express.static('node_modules'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//DEFINES PORT
var PORT = process.env.PORT || 3000;

//SETS HANDLEBARS AS OUR MAIN VIEW ENGINE AND USES MAIN AS DEFAULT LAYOUT
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
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

//Use routes
app.use('/', index);
app.use('/admin', admin);
app.use('/blog', blog);
app.use('/contact', contact);
app.use('/portfolio', portfolio);
app.use('/resume', resume);
app.use('/thankyou', thankyou);


//404 CATCH FOR PORTFOLIO
app.use(function (req, res, next) {
	res.status(404).render('404');
});

//START SERVER LISTENING
app.listen(PORT, function () {
	console.log('App listening on port: ' + PORT);
});

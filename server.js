//PACKAGES REQUIRED FOR EXPRESS SERVER AND HANDLEBARS TEMPLATING 
var express = require('express');
var exphbs = require('express-handlebars');
var expressRobotsMiddleware = require('express-robots-middleware');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var fs = require('fs');
var Contact = require('./assets/js/models/contactModel.js');
var Blog = require('./assets/js/models/blogModel.js');

//DEFINES APP METHOD
var app = express();

//LETS EXPRESS USE STATIC FILES
app.use(express.static('node_modules'));

app.use(express.static(path.join(__dirname, 'assets')));

//DEFINES PORT
var PORT = process.env.PORT || 3000;

var urlencodedParser = bodyParser.urlencoded({ extended: false});

// ROBOTS.TXT MIDDLEWARE
var robotsMiddleware = expressRobotsMiddleware([{
	UserAgent: '*',
	Disallow: ['/thankyou'],
	Allow: ['/', '/about', '/contact', '/portfolio'],
	CrawlDelay: '5'
}]);


//SETS HANDLEBARS AS OUR MAIN VIEW ENGINE AND USES MAIN AS DEFAULT LAYOUT
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ROBOTS.TXT ROUTE
app.get('/robots.txt', robotsMiddleware);

//GETS OUR DEFAULT ROUTE FOR PORTFOLIO
app.get('/', function (req, res){
	res.render('index');
});

//GETS ADMIN ROUTE
app.get('/admin', function(req, res){
	res.render('admin');
});

app.post('/admin', urlencodedParser, function(req,res){

	var post = new Blog({
		title: req.body.title,
		author: req.body.author,
		body: req.body.body,
		date: Date.now()
	});

	post.save(function(err){
		if (err) return handleError(err);
		res.render('admin');
 	});
});
//GETS BLOG ROUTE
app.get('/blog', function(req, res){
	res.render('blog');
});

//GETS CONTACT ROUTE FOR PORTFOLIO
app.get('/contact', function (req, res) {
	res.render('contact');
});

//GETS PROJECTS ROUTE FOR PORTFOLIO
app.get('/portfolio', function (req, res) {
	res.render('portfolio');
});

//GETS RESUME ROUTE
app.get('/resume', function (req, res) {
	var resume = './assets/resume/KevinHubbard.pdf';
	fs.readFile(resume, function(err,data) {
		res.setHeader('Content-type', 'application/pdf');
		res.send(data);
	})
});

//POST USER INFO FROM CONTACT PAGE
app.post('/thankyou', urlencodedParser, function(req, res){

	var info = new Contact({
		name: req.body.name,
		email: req.body.email,
		msg: req.body.msg,
		role: req.body.role,
		date: Date.now()
	}); 

	info.save(function(err){
		if (err) return handleError(err);
		res.render('thankyou', {name: req.body.name, email: req.body.email});
	});
});

//404 CATCH FOR PORTFOLIO
app.use(function (req, res, next) {
	res.status(404).render('404');
});

//START SERVER LISTENING
app.listen(PORT, function () {
	console.log('App listening on port: ' + PORT);
});

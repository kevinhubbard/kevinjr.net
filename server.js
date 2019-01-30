//PACKAGES REQUIRED FOR EXPRESS SERVER AND HANDLEBARS TEMPLATING 
var express = require('express');
var exphbs = require('express-handlebars');
var expressRobotsMiddleware = require('express-robots-middleware');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var fs = require('fs');

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

//SETS DB CONNECTION URI STRING
var URI = 'mongodb://heroku_3pj31sf1:73t6prtueeq1a9c40ljtit5s31@ds127883.mlab.com:27883/heroku_3pj31sf1';

//SETS HANDLEBARS AS OUR MAIN VIEW ENGINE AND USES MAIN AS DEFAULT LAYOUT
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// ROBOTS.TXT ROUTE
app.get('/robots.txt', robotsMiddleware);

//GETS OUR DEFAULT ROUTE FOR PORTFOLIO
app.get('/', function (req, res){
	res.render('index');
});

//GETS ABOUT ME ROUTE
app.get('/about', function(req, res){
	res.render('about');
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
app.get('/resume', function(req, res){
	var tempFile = '/assets/resume/KevinHubbard.pdf';
	fs.readFile(__dirname + tempFile, function(err,data){
		res.contentType('application/pdf');
		res.send(data);
	});
});

//POST USER INFO FROM CONTACT PAGE
app.post('/thankyou', urlencodedParser, function(req, res){

	console.log(req.body.name);
	console.log(req.body.email);
	console.log(req.body.msg);
	console.log(req.body.role);

	//LOG USER INPUT TO DATABASE
	MongoClient.connect(URI, function(err, db){
		if(err){
			console.log(err);
		} else {
			var userInput = db.collection('userInput');
			userInput.insertOne({
				name: req.body.name,
				email: req.body.email,
				msg: req.body.msg,
				role:req.body.role
			});
			console.log('successfully submitted data to MONGODB');
		}
	});
	
	res.render('thankyou', {name: req.body.name, email: req.body.email});
});

//404 CATCH FOR PORTFOLIO
app.use(function (req, res, next) {
	res.status(404).render('404');
});

//START SERVER LISTENING
app.listen(PORT, function () {
	console.log('App listening on port: ' + PORT);
});

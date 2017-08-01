//PACKAGES REQUIRED FOR EXPRESS SERVER AND HANDLEBARS TEMPLATING 
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')

//DEFINES APP METHOD
var app = express();

//LETS EXPRESS USE STATIC FILES
app.use(express.static('node_modules'));

app.use(express.static(path.join(__dirname, 'assets')));

//DEFINES PORT
var PORT = process.env.PORT || 8080;

var urlencodedParser = bodyParser.urlencoded({ extended: false})

//SETS UP DB CONNECTION
var URI = 'mongodb://heroku_3pj31sf1:73t6prtueeq1a9c40ljtit5s31@ds127883.mlab.com:27883/heroku_3pj31sf1';




//TEST POST
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
		userInput.insertOne({name: req.body.name, email: req.body.email, msg: req.body.msg, role: req.body.role});
		console.log('successfully submitted data to MONGODB');
	}
});
	
	res.render('thankyou', {name: req.body.name, email: req.body.email});
});

//SETS HANDLEBARS AS OUR MAIN VIEW ENGINE AND USES MAIN AS DEFAULT LAYOUT
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//GETS OUR DEFAULT ROUTE FOR PORTFOLIO
app.get('/', function (req, res){
	res.render('index');
});

//GETS CONTACT ROUTE FOR PORTFOLIO
app.get('/contact', function (req, res) {
	res.render('contact');
});

//GETS PROJECTS ROUTE FOR PORTFOLIO
app.get('/portfolio', function (req, res) {
	res.render('portfolio');
});

//404 CATCH FOR PORTFOLIO
app.use(function (req, res, next) {
	res.status(404).render('404');
});

//START SERVER LISTENING
app.listen(PORT, function () {
	console.log('App listening on port: ' + PORT);
});

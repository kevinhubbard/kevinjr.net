//PACKAGES REQUIRED FOR EXPRESS SERVER AND HANDLEBARS TEMPLATING 
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');

//DEFINES APP METHOD
var app = express();

//LETS EXPRESS USE STATIC FILES
app.use(express.static('node_modules'));

app.use(express.static(path.join(__dirname, 'assets')));

//DEFINES PORT
var PORT = process.env.PORT || 8080;

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
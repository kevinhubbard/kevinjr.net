require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const expressRobotsMiddleware = require('express-robots-middleware');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

// DEFINES APP METHOD
const app = express();

// REALTIME UPDATES
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
app.set('io', io);

io.on('connection', (socket) => {
	console.log('New Client Connected');

	socket.on('joinRoom', (roomName) => {
		socket.join(roomName);
		console.log(`Socket joined room: ${roomName}`);
	});

	socket.on('startRound', ({roundID}) => {
		io.to(`round-${roundID}`).emit('roundStarted', {roundID});
	});

  socket.on('holeFinished', ({ roundID, userID, holeNum, strokes }) => {
    console.log(`[server] holeFinished: user ${userID}, hole ${holeNum}, strokes: ${strokes}`);
    console.log('update should fire');
    io.to(`round-${roundID}`).emit('updateScore', { userID, holeNum, strokes });
    console.log('after update');
  });

	socket.on('disconnect', () => {
		console.log('client disconnected.');
	});
});

// LETS EXPRESS USE STATIC FILES
app.use(express.static('node_modules'));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api', require('cors')());

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
		},
		formatDate: function(datetime) {
			return new Date(datetime).toDateString();
		},
		json: function(context) {
			return JSON.stringify(context);
		}
	}
}));
app.set('view engine', 'handlebars');

// ROBOTS.TXT MIDDLEWARE
const robotsMiddleware = expressRobotsMiddleware([{
	UserAgent: '*',
	Disallow: ['/admin','/thankyou', '/profile'],
	Allow: ['/', '/blog', '/contact', '/portfolio', '/resume'],
	CrawlDelay: '5'
}]);

// ROBOTS.TXT ROUTE
app.get('/robots.txt', robotsMiddleware);

// INITIALIZE USER SESSION
//app.set('trust proxy', 1);
app.use(session({
	secret: process.env.SECRET_KEY,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: false,
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 1000 * 60 * 60 * 24
	}
}));

// ROUTES
app.use('/', require('./controllers/index'));
app.use('/admin', require('./controllers/admin'));
app.use('/contact', require('./controllers/contact'));
app.use('/portfolio', require('./controllers/portfolio'));
app.use('/resume', require('./controllers/resume'));
app.use('/golfcard', require('./controllers/golfcard'));
app.use('/botw', require('./controllers/botw'));
app.use('/brpaints', require('./controllers/brpaints'));
app.use('/workout', require('./controllers/workout'));
app.use('/meals', require('./controllers/meals'));
app.use('/blog', require('./controllers/blog'));
app.use('/signup', require('./controllers/signup'));
app.use('/verify', require('./controllers/verify'));
app.use('/profile', require('./controllers/profile'));
app.use('/card-games', require('./controllers/cardGames'));


// 404 CATCH
app.use(function (req, res, next) {
	res.status(404).render('404',{
		css: ['style.css', 'error.css'],
		js: ['menu.js', 'loginScript.js']
	});
});

// START SERVER LISTENING
server.listen(process.env.PORT, function () {
	console.log('App listening on port: ' + process.env.PORT);
});
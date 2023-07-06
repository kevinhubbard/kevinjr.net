var Sequelize = require('sequelize');
var db = require('../config/config');
var connection;

if (process.env.NODE_ENV === 'production') {
	connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
		host: process.env.HOST,
		dialect: 'mysql'
	});
} else {
	connection = new Sequelize(db.DATABASE, db.USER, db.PASSWORD, {
		host: db.HOST,
		dialect: 'mysql'
	});
}

try {
	connection.authenticate();
	console.log('Connection successfully established.');
} catch (error) {
	console.error('Unable to connect to database', error);
}

module.exports = connection;
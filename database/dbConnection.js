var Sequelize = require('sequelize');
var connection;

if (process.env.NODE_ENV === 'production') {
	connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
		host: process.env.HOST,
		dialect: 'mysql'
	});
} else {
	var db = require('../config').testdb;
	connection = new Sequelize(db.database, db.user, db.password, {
		host: db.host,
		dialect: 'mysql',
		logging: false
	});
}

try {
	connection.authenticate();
	console.log('Connection successfully established.');
	connection.sync();
} catch (error) {
	console.error('Unable to connect to database', error);
}

module.exports = connection;
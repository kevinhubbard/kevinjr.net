require('dotenv').config();
const Sequelize = require('sequelize');
let connection;

if (process.env.NODE_ENV === 'production') {
	connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
		host: process.env.HOST,
		dialect: 'mysql',
		logging: false
	});
} else {
	connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
		host: process.env.HOST,
		dialect: 'mysql',
		logging: false
	});
}

(async () => {
	try {
		connection.authenticate();
		console.log('Connection successfully established.');
		connection.sync();
	} catch (error) {
		console.error('Unable to connect to database', error);
	}
})();

module.exports = connection;
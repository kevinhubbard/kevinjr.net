require('dotenv').config();
const Sequelize = require('sequelize');

let isProd = process.env.NODE_ENV === 'production';
let poolConfig;

if (isProd) {
	poolConfig = {
      	max: 10,			// maximum number of connections
      	min: 0,				// minimum number of connections
      	acquire: 30000,		// max time (ms) to try to get connection before throwing error
      	idle: 10000			// time (ms) after which an idle connection is released
	};
} else {
	poolConfig = {
      	max: 3,
      	min: 0,
      	acquire: 10000,
      	idle: 5000	
	}
}

const connection = new Sequelize(
	process.env.DB,
	process.env.DB_USER,
  	process.env.DB_PASSWORD,
  	{
    	host: process.env.DB_HOST,
    	dialect: 'mysql',
   		logging: !isProd,
    	pool: poolConfig
  	}
);

(async () => {
	try {
		await connection.authenticate();
		console.log('Connection successfully established.');
		await connection.sync();
	} catch (error) {
		console.error('Unable to connect to database', error);
	}
})();

module.exports = connection;
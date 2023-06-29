var mysql = require('mysql');

var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);

//connection.connect();

//connection.end();

module.exports = connection;
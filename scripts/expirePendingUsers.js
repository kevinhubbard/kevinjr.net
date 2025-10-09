require('dotenv').config({ path: '../.env' }); 
const mariadb = require('mariadb');

async function cleanPendingUsers() {
	const conn = await mariadb.createConnection({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB
	});

	try {
		connection.query(queryString, function(error, results, fields) {
			if (error) throw error;
			console.log(results);
			console.log(fields);
		});
	} catch (error) {
		console.error("Error during cleanup: ", error);
	} finally {
		connection.destroy();
	}
}
cleanPendingUsers();
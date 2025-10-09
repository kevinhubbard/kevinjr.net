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
		const res = await conn.query('SELECT * FROM PendingUsers WHERE expiresAt < NOW()');
		console.log(res);
	} catch (error) {
		console.error("Error during cleanup: ", error);
	} finally {
		conn.end();
	}
}
cleanPendingUsers();
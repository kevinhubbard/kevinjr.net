// cleanup.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function runCleanup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
  });

  try {
    // 1. Select expired users
    const [expiredUsers] = await connection.execute(
      'SELECT ipAddress FROM PendingUsers WHERE expiresAt < NOW()'
    );

    /*if (expiredUsers.length > 0) {
      // 2. Insert into BannedIPs
      const values = expiredUsers.map(user => [user.ipAddress]);
      await connection.query(
        'INSERT IGNORE INTO BannedIPs (ip) VALUES ?',
        [values]
      );

      // 3. Delete from PendingUsers
      await connection.query(
        'DELETE FROM PendingUsers WHERE expiresAt < NOW()'
      );

      console.log(`Moved ${expiredUsers.length} user(s) to BannedIPs.`);
    } else {
      console.log('No expired users found.');
    }*/
  } catch (err) {
    console.error('Error during cleanup:', err);
  } finally {
    connection.end();
  }
}

runCleanup();
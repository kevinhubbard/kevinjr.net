const db = require('../database/dbConnection.js');
const PendingUser = require('../models/pendingUser.js');
const SusUser = require('../models/suspusiousUsers.js');
const { Op } = require('sequelize');

async function purgeExpiredUsers() {
	try {
		const expiredUsers = await PendingUser.findAll({
			where: {
				expiresAt: {
					[Op.lt]: new Date()
				}
			}
		});
		for (let i = 0; i < expiredUsers.length; i++) {

			console.log('\nEmail: ' + expiredUsers[i].email);
			console.log('name: ' + expiredUsers[i].name);
			console.log('ipAddress: ' + expiredUsers[i].ipAddress + '\n');

			try {
				const susUser = await SusUser.create({
					ipAddress: expiredUsers[i].ipAddress,
					attemptCount: 1,
					created_at: new Date(),
					updated_at: new Date()
				});

			} catch (err) {
				console.log('Error creating suspicious user.', err);
			}
			await expiredUsers[i].destroy();
		}
	} catch (err) {
		console.log('Error: ', err);
	}
}

purgeExpiredUsers();
const fs = require('fs');
const path = require('path');
let logPath = '';

function logVisitor(req, res, next) {
	const time = new Date();
	res.on('finish', function() {
		const logEntry = [
			time.toISOString(),
			req.headers['cf-connecting-ip'] || req.ip,
			req.method,
			req.originalUrl,
			res.statusCode,
			req.headers['user-agent'] || 'Unknown'
		].join(' | ') + '\n';	

		if (res.statusCode === 403) {
			logPath = path.join(__dirname, '../logs/bannedVisitor.log');
		} else {
			logPath = path.join(__dirname, '../logs/allowedVisitor.log');
		}

		fs.appendFile(logPath, logEntry, function(err) {
			if (err) console.error('Error writing visitor log: ', err);
		});
	});

	next();
}

module.exports = logVisitor;
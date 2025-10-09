const fs = require('fs');
const path = require('path');

const logPath = path.join(__dirname, '../logs/visitors.log');

function logVisitor(req, res, next) {
	const logEntry = [
		new Date().toISOString(),
		req.ip,
		req.method,
		req.originalUrl,
		req.headers['user-agent'] || 'Unknown'
	].join(' | ') + '\n';

	fs.appendFile(logPath, logEntry, err => {
		if (err) console.error('Error writing visitor log: ', err);
	});

	next();
}

module.exports = logVisitor;
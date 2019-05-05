
var config = require('../config');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.createConnection(config.uri, {useNewUrlParser: true});

var contactSchema = new Schema({
	name: String,
	email: String,
	msg: String,
	role: String,
	date: {type: Date, default: Date.now} 
});

var Contact = db.model('Contact', contactSchema);

module.exports = Contact;
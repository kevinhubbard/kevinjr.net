var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.createConnection('mongodb://heroku_3pj31sf1:73t6prtueeq1a9c40ljtit5s31@ds127883.mlab.com:27883/heroku_3pj31sf1', {useNewUrlParser: true});

var contactSchema = new Schema({
	name: String,
	email: String,
	msg: String,
	role: String,
	date: {type: Date, default: Date.now} 
});

var Contact = db.model('Contact', contactSchema);

module.exports = Contact;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://heroku_g8cnkqnz:dvskprbp3ss4brfc50fq15c8pf@ds235658.mlab.com:35658/heroku_g8cnkqnz', { useNewUrlParser: true, useUnifiedTopology: true});

var contactSchema = new Schema({
	name: String,
	email: String,
	msg: String,
	role: String,
	state: String,
	date: {type: Date, default: Date.now} 
});

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;





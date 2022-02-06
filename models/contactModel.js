var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);

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





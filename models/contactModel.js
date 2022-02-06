var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://user:root@kevinjr.my9dq.mongodb.net/kjrProduction?retryWrites=true&w=majority');

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
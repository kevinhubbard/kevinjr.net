
var config = require('../config/config.js');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(MONGODB_URI, {useUnifiedTopology: true, useNewUrlParser: true});

var contactSchema = new Schema({
	name: String,
	email: String,
	msg: String,
	role: String,
	date: {type: Date, default: Date.now} 
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  var Contact = model('Contact', contactSchema);
  module.exports = Contact;
});






var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var infoSchema = new Schema({
	name: String,
	number: Number
});

var Info = mongoose.model('Info', infoSchema);

module.exports = Info;
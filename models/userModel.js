var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://heroku_g8cnkqnz:dvskprbp3ss4brfc50fq15c8pf@ds235658.mlab.com:35658/heroku_g8cnkqnz');

var adminSchema = new Schema({
	username: {
		type:String,
		required:true
	},
	password: {
		type: String,
		required: true
	}
});

adminSchema.methods.hashPassword = function (password) {
	bcrypt.genSalt(10, function(err, salt){
		bcrypt.hash(password, salt, function(err, hash){
			return hash;
		});
	});
}

adminSchema.methods.comparePassword = function (password, hash) {
	return bcrypt.compare(password, hash, function(err, res){
		console.log(res);
	});
}


var Admin = db.model('Admin', adminSchema);

module.exports = Admin;
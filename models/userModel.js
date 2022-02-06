var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);

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
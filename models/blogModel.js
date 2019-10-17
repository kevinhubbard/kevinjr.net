var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://heroku_g8cnkqnz:dvskprbp3ss4brfc50fq15c8pf@ds235658.mlab.com:35658/heroku_g8cnkqnz', { useNewUrlParser: true, useUnifiedTopology: true });

var blogSchema = new Schema({
	title: String,
	author: String,
	body: String,
	date: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
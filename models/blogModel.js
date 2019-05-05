
var config = require('../config');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var db = mongoose.createConnection(config.uri, {useNewUrlParser: true});

var blogSchema = new Schema({
	title: String,
	author: String,
	body: String,
	date: {type: Date, default: Date.now}
});

var Blog = db.model('Blog', blogSchema);

module.exports = Blog;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI);

var blogSchema = new Schema({
	title: String,
	author: String,
	body: String,
	date: {type: Date, default: Date.now}
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
var sequelize = require('../database/dbConnection');

const Post = sequelize.define('Post', {
	postID: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
	title: {
		type: DataTypes.STRING,
		allowNull: false
	},
	body: {
		type: DataTypes.TEXT('medium'),
		allowNull: false
	}
},  {
	tableName: 'Posts',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

module.exports = Post;
const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
var sequelize = require('../database/dbConnection');

const Post = sequelize.define('Post', {
	postID: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	author: {
		type: DataTypes.STRING,
		allowNull: false
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
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = Post;
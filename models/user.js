const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
var sequelize = require('../database/dbConnection');

const User = sequelize.define('User', {
	userID: {
		type: DataTypes.SMALLINT,
		autoIncrement: true,
		primaryKey: true
	}, 
	email: {
		type: DataTypes.STRING(60),
		unique: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(60),
		allowNull: false
	}, 
	password: {
		type: DataTypes.STRING(60),
		allowNull: false
	}
}, {
	tableName: 'Users',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

module.exports = User;
const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
var sequelize = require('../database/dbConnection');

const PendingUser = sequelize.define('PendingUser', { 
	publicID: {
		type: DataTypes.STRING(36),
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(30),
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(45),
		unique: true,
		allowNull: false
	}, 
	password: {
		type: DataTypes.STRING(60),
		allowNull: false
	},
	role: {
		type: DataTypes.ENUM,
		values: ['admin', 'editor', 'user'],
		defaultValue: 'user',
		allowNull: false
	},
	ipAddress: {
		type: DataTypes.STRING(45),
		allowNull: false
	},
	token: {
		type: DataTypes.STRING(64),
		allowNull: false
	},
	expiresAt: {
		type: DataTypes.DATE,
		allowNull: false
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false
	},
	updatedAt: {
		type: DataTypes.DATE,
		allowNull: false
	}
}, {
	tableName: 'PendingUsers',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = PendingUser;
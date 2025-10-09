const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
var sequelize = require('../database/dbConnection');

const User = sequelize.define('User', { 
	publicID: {
		type: DataTypes.STRING(36),
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(60),
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(60),
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
	registeredIp: {
		type: DataTypes.STRING(45),
		allowNull: false
	},
	ipv4Initial: {
		type: DataTypes.STRING(15),
		allowNull: true
	},
	ipv6Initial: {
		type: DataTypes.STRING(60),
		allowNull: true
	},
	ipv4Current: {
		type: DataTypes.STRING(15),
		allowNull: true
	},
	ipv6Current: {
		type: DataTypes.STRING(60),
		allowNull: true
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
	tableName: 'Users',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = User;
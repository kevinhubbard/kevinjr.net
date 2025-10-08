const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
var sequelize = require('../database/dbConnection');

const PendingUser = sequelize.define('PendingUse2r', { 
	publicID: {
		type: DataTypes.STRING(36),
		primaryKey: true,
		unique: true,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING(45),
		unique: true,
		allowNull: false
	},
	name: {
		type: DataTypes.STRING(30),
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
	token: {
		type: DataTypes.STRING(64),
		allowNull: false
	},
	expiresAt: {
		type: DataTypes.DATE,
		allowNull: false
	},
	ipAddress: {
		type: DataTypes.STRING(45),
		allowNull: false
	}
}, {
	tableName: 'PendingUser2s',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

module.exports = PendingUser;
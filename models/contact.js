const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../database/dbConnection');

const Message = sequelize.define('Message', {
	messageID: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	message: {
		type: DataTypes.TEXT,
		allowNull: false
	}
}, {
	tableName: 'Messages',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = Message;
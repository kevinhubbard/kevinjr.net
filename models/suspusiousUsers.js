const {Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/dbConnection');

const SusUser = connection.define('SusUser', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	ipAddress: {
		type: DataTypes.STRING(45),
		allowNull: false
	},
	attemptCount: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
},{
	tableName: 'SusUsers',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = SusUser;
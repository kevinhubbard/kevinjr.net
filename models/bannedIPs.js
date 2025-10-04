const {Sequelize, DataTypes } = require('sequelize');
const connection = require('../database/dbConnection');

const BannedIP = connection.define('BannedIP', {
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
	reason: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	banType: {
		type: DataTypes.ENUM('temporary', 'permanent', 'unbanned'),
		allowNull: false
	},
	attemptCount: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	banCount: {
		type: DataTypes.INTEGER,
		allowNull: false
	}, 
	firstAttemptAt: {
		type: DataTypes.DATE,
		allowNull: false
	},
	lastAttemptAt: {
		type: DataTypes.DATE,
		allowNull: false
	},
	userAgent: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	referrer: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	pathAttempted: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	geoLocation: {
		type: DataTypes.TEXT,
		allowNull: true
	},
	bannedAt: {
		type: DataTypes.DATE,
		allowNull: false
	},
	banExpiresAt: {
		type: DataTypes.DATE,
		allowNull: true
	},
	unbannedAt: {
		type: DataTypes.DATE,
		allowNull: true
	}, 
	notes: {
		type: DataTypes.TEXT,
		allowNull: true
	}
},{
	tableName: 'BannedIPs',
	timestamps: true,
	createdAt: 'created_at',
	updatedAt: 'updated_at'
});

module.exports = BannedIP;
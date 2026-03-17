const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
const sequelize = require('../database/dbConnection');
const User = require('./user.js');

const Course = sequelize.define('Course', {
		courseID: {
			type: DataTypes.SMALLINT,
			autoIncrement: true,
			primaryKey: true
		},
		courseName: {
			type: DataTypes.STRING(50),
			unique: true
		},
		township: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		state: {
			type: DataTypes.STRING(2),
			allowNull: true	
		}
}, {
	tableName: 'Courses',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

const Teebox = sequelize.define('Teebox', {
	teeBoxID: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	courseID: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	teeName: {
		type: DataTypes.STRING(20),
		allowNull: false
	},
	totalYards: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	rating: {
		type: DataTypes.DECIMAL(3,1),
		allowNull: true
	},
	slope: {
		type: DataTypes.TINYINT.UNSIGNED,
		allowNull: true
	}
}, {
	tableName: 'TeeBoxes',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

const Round = sequelize.define('Round', {
	roundID: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	hostID: {
		type: DataTypes.STRING(36),
		allowNull: false
	},
	courseID: {
		type: DataTypes.SMALLINT,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Please enter course ID'
			}
		}
	},
	teeBoxID: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	status: {
		type: DataTypes.ENUM('waiting', 'active', 'finished'),
		allowNull: false,
		defaultValue: 'waiting'
	}
}, {
	tableName: 'Rounds',
	timestamps: true,
	createdAt: true,
	updatedAt: false
});

const Score = sequelize.define('Score', {
	roundID: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true
	},
	userID: {
		type: DataTypes.STRING(36),
		allowNull: false,
		primaryKey: true
	},
	holeNumber: {
		type: DataTypes.TINYINT,
		allowNull: false,
		primaryKey: true
	},
	strokes: {
		type: DataTypes.TINYINT,
		allowNull: false
	},
	fairwayHit: {
		type: DataTypes.BOOLEAN,
		defaultValue: null,
		allowNull: true
	},
	greenInReg: {
		type: DataTypes.BOOLEAN,
		defaultValue: null,
		allowNull: true
	}
}, {
	tableName: 'Scores',
	timestamps: false,
	id: false
});

const Hole = sequelize.define('Hole', {
	holeID: {
		type: DataTypes.SMALLINT,
		autoIncrement: true,
		primaryKey: true
	},
	teeBoxID: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	holeNumber: {
		type: DataTypes.TINYINT,
		allowNull: false
	},
	par: {
		type: DataTypes.TINYINT,
		allowNull: false
	},
	yards: {
		type: DataTypes.SMALLINT,
		allowNull: false
	}
	}, {
		tableName: 'Holes',
		timestamps: false,
		createdAt: false,
		updatedAt: false
});

const RoundParticipant = sequelize.define('RoundParticipants', {
	roundID: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		references: {
			model: 'Rounds',
			key: 'roundID'
		}
	},
	userID: {
		type: DataTypes.STRING(36),
		allowNull: false,
		primaryKey: true,
		references: {
			model: 'Users',
			key: 'publicID'
		}
	}
}, {
	tableName: 'RoundParticipants',
	timestamps: false,
	createdAt: false,
	updatedAt: false,
	freezeTableName: true
});

// COURSE RELATIONS
Course.hasMany(Teebox, { foreignKey: 'courseID' });
Teebox.belongsTo(Course, { foreignKey: 'courseID' });

Course.hasMany(Round, { foreignKey: 'courseID' });
Round.belongsTo(Course, { foreignKey: 'courseID' });

// TEEBOX RELATIONS
Teebox.hasMany(Round, { foreignKey: 'teeBoxID' });
Round.belongsTo(Teebox, { foreignKey: 'teeBoxID' });

// ROUND PARTICIPANTS
Round.hasMany(RoundParticipant, { foreignKey: 'roundID' });
RoundParticipant.belongsTo(Round, { foreignKey: 'roundID' });

User.hasMany(RoundParticipant, { foreignKey: 'userID' });
RoundParticipant.belongsTo(User, { foreignKey: 'userID' });

module.exports = {Course, Teebox, Round, Hole, RoundParticipant, Score};
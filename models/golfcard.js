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
		par: {
			type: DataTypes.TINYINT.UNSIGNED,
			allowNull: false
		},
		yards: {
			type: DataTypes.SMALLINT.UNSIGNED,
			allowNull: true
		},
		rating: {
			type: DataTypes.DECIMAL(3,1),
			allowNull: true
		},
		slope: {
			type: DataTypes.TINYINT.UNSIGNED,
			allowNull: true
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

const Round = sequelize.define('Round', {
	roundID: {
		type: DataTypes.SMALLINT,
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
	status: {
		type: DataTypes.STRING,
		allowNull: false
	}/*,
	strokes: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Please enter number of strokes'
			},
			validStrokes(value) {
				if (value < 18) {
					throw new Error("Strokes must be more than 18")
				}
			}
		}
	},
	score: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Please enter a score'
			},
			validScore(value) {
				if (value < -50 || value > 50) {
					throw new Error("Score must be between -50 and 50")
				}
			}
		}
	}*/
}, {
	tableName: 'Rounds',
	timestamps: false,
	createdAt: true,
	updatedAt: false
});

const RoundScore = sequelize.define('RoundScore', {
	scoreID: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	roundID: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	userID: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	holeNumber: {
		type: DataTypes.TINYINT,
		allowNull: false
	},
	strokes: {
		type: DataTypes.TINYINT.UNSIGNED,
		allowNull: false
	}
}, {
	tableName: 'RoundScores',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

const Hole = sequelize.define('Hole', {
	holeID: {
		type: DataTypes.SMALLINT,
		autoIncrement: true,
		primaryKey: true
	},
	courseID: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	holeNumber: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	par: {
		type: DataTypes.SMALLINT,
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
		type: DataTypes.SMALLINT,
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

Round.belongsTo(Course, { foreignKey: 'courseID' });
Course.hasMany(Round, { foreignKey: 'courseID' });

RoundParticipant.belongsTo(User, { foreignKey: 'userID' });
User.hasMany(RoundParticipant, { foreignKey: 'userID' });

RoundParticipant.belongsTo(Round, { foreignKey: 'roundID' });
Round.hasMany(RoundParticipant, { foreignKey: 'roundID' });

module.exports = {Course, Round, Hole, RoundParticipant}
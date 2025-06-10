const {Sequelize, DataTypes, QueryTypes} = require('sequelize');
const sequelize = require('../database/dbConnection');

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
	courseID: {
		type: DataTypes.SMALLINT,
		allowNull: false,
		validate: {
			notNull: {
				msg: 'Please enter course ID'
			}
		}
	},
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
	}
}, {
	tableName: 'Rounds',
	timestamps: false,
	createdAt: true,
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

module.exports = {Course, Round, Hole}
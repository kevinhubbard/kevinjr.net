const {Sequelize, DataTypes } = require('sequelize');
var sequelize = require('../database/dbConnection');
//sequelize.sync({alter: true});
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
	tableName: 'Courses'
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
	holesPlayed: {
		type: DataTypes.TINYINT.UNSIGNED,
		allowNull: false,
		validate: {
			validHoles(value) {
				if (value != 9 || value != 18) {
					throw new Error("holes played must be 9 or 18")
				}
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
	tableName: 'Rounds'
})

module.exports = {Course, Round}
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../database/dbConnection');

const MuscleGroup = sequelize.define('MuscleGroup', {
	muscleGroupID: {
		type: DataTypes.SMALLINT,
		autoIncrement: true,
		primaryKey: true
	},
	muscleGroup: {
		type: DataTypes.STRING(10),
		unique: true,
		allowNull: false
	}
}, {
	tableName: 'MuscleGroups',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

const Exercise = sequelize.define('Exercise', {
	exerciseID: {
		type: DataTypes.SMALLINT,
		autoIncrement: true,
		primaryKey: true
	},
	exerciseName: {
		type: DataTypes.STRING(75),
		unique: true,
		allowNull: false
	},
	muscleGroupID: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	muscleID: {
		type: DataTypes.SMALLINT,
		allowNull: false
	}
}, {
	tableName: 'Exercises',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

const Workout = sequelize.define('Workout', {
	workoutID: {
		type: DataTypes.SMALLINT,
		autoIncrement: true,
		primaryKey: true
	},
	workoutName: {
		type: DataTypes.STRING(255),
		allowNull: false
	},
	createdBy: {
		type: DataTypes.STRING(36),
		allowNull: true
	}
}, {
	tableName: 'Workouts',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});


const Muscle = sequelize.define('Muscle', {
	muscleID: {
		type: DataTypes.SMALLINT,
		autoIncrement: true,
		primaryKey: true
	},
	muscleName: {
		type: DataTypes.STRING(30),
		unique: true,
		allowNull: false
	},
	muscleGroupID: {
		type: DataTypes.SMALLINT,
		allowNull: false
	}
}, {
	tableName: 'Muscle',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

module.exports = {MuscleGroup, Exercise, Muscle, Workout}
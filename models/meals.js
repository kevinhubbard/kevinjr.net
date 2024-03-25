const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../database/dbConnection');

const Ingredient = sequelize.define('Ingredient', {
	ingredientID: {
		type: DataTypes.SMALLINT,
		autoIncrement: true,
		primaryKey: true
	},
	ingredientName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	foodGroup: {
		type: DataTypes.STRING,
		allowNull: false
	},
	servingSize: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	calories: {
		type: DataTypes.SMALLINT,
		allowNull: false
	},
	totalFat: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	saturatedFat: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	transFat: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	cholesterol: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	sodium: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	totalCarbohydrates: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	fiber: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	sugar: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	protein: {
		type: DataTypes.SMALLINT,
		allowNull: true
	},
	imgLocation: {
		type: DataTypes.STRING,
		allowNull: false
	},
}, {
	tableName: 'Ingredients',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

module.exports = Ingredient;
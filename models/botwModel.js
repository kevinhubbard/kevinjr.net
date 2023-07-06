const {Sequelize, DataTypes } = require('sequelize');
var connection = require('../database/dbConnection');

const Ingredient = connection.define('Ingredient', {
	ingredientName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	ingredientHearts: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	ingredientPrice: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	ingredientTrait: {
		type: DataTypes.STRING,
		allowNull: false
	},
	ingredientDescription: {
		type: DataTypes.STRING,
		allowNull: true
	}
});

module.exports = Ingredient;
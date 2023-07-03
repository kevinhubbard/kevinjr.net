const {Sequelize, DataTypes } = require('sequelize');
var config = require('../config/config');
const sequelize = new Sequelize(config.db.DATABASE, config.db.USER, config.db.PASSWORD, {
	host: config.db.HOST,
	dialect: 'mysql'
});

const Ingredient = sequelize.define('Ingredient', {
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

Ingredient.sync();

module.exports = {Ingredient, sequelize};

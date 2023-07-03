const {Sequelize, DataTypes } = require('sequelize');
const sequelize;

if (process.env.NODE_ENV === 'production') {
	sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
		host: process.env.HOST,
		dialect: 'mysql'});
} else {
	var config = require('../config/config');
	sequelize = new Sequelize(config.db.DATABASE, config.db.USER, config.db.PASSWORD, {
		host: config.db.HOST,
		dialect: 'mysql'
	});
}

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

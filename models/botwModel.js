const {Sequelize, DataTypes } = require('sequelize');
var db = require('../config/config');
var sequelize;

if (process.env.NODE_ENV === 'production') {
	sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
		host: process.env.HOST,
		dialect: 'mysql'
	});
} else {
	sequelize = new Sequelize(db.DATABASE, db.USER, db.PASSWORD, {
		host: db.HOST,
		dialect: 'mysql'
	});
}

try {
	sequelize.authenticate();
	console.log('Connection successfully established.');
} catch (error) {
	console.error('Unable to connect to database', error);
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

module.exports = Ingredient;

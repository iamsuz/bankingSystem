const Sequelize = require('sequelize');
const conn = require('../db');

module.exports = conn.define('Bank',{
	id:{
		type:Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	name: Sequelize.STRING(255),
	address: Sequelize.TEXT,
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE
	}
})
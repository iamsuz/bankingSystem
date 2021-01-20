const Sequelize = require('sequelize');
const conn = require('../db');

module.exports = conn.define('User',{
	id:{
		type:Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	}
	name: Sequelize.STRING(255),
	username: {
		type:Sequelize.STRING(255)
		allowNull:false,
		unique:true
	},
	createdAt: {
		allowNull: false,
		type: Sequelize.DATE
	},
	updatedAt: {
		allowNull: false,
		type: Sequelize.DATE
	}
})
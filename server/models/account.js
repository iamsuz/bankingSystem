const Sequelize = require('sequelize');
const conn = require('../db');

module.exports = conn.define('Account',{
	id:{
		type:Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	number:{
		type:Sequelize.INTEGER(11),
		allowNull: false,
		unique: true
	},
	balance:{
		type: Sequelize.INTEGER(11),
		allowNull:false,
		defaultValue: 0
	},
	userId:{
		type: Sequelize.INTEGER,
		references:{
			model: 'User',
			key:'id'
		}
	},
	bankId:{
		type: Sequelize.INTEGER,
		references:{
			model: 'Bank',
			key:'id'
		}
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
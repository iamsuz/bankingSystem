const Sequelize = require('sequelize');
const conn = require('../db');


// transaction type is binary as 0 is debit and 1 credit

module.exports = conn.define('Transactions',{
	id:{
		type:Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	type:{
		type:Sequelize.BOOLEAN,
		allowNull: false
	},
	amount:{
		type: Sequelize.INTEGER(11)
	},
	from:{
		type: Sequelize.INTEGER,
		references:{
			model: 'Account',
			key:'id'
		}
	},
	to:{
		type: Sequelize.INTEGER,
		references:{
			model: 'Account',
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
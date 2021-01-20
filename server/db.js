var Sequelize = require('sequelize');


var conn = new Sequelize('banking_system','root','qwertyuiop',{
	host:'localhost',
	dialect:'mysql'
})

module.exports = conn
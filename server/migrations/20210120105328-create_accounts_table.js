'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Accounts',{
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
        type: Sequelize.INTEGER(11)
      },
      userId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Users',
          key:'id'
        }
      },
      bankId:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Banks',
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Accounts');
   }
 };

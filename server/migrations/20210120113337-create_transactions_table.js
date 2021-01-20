'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transactions',{
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
          model: 'Accounts',
          key:'id'
        }
      },
      to:{
        type: Sequelize.INTEGER,
        references:{
          model: 'Accounts',
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
    await queryInterface.dropTable('Transactions');
   }
 };

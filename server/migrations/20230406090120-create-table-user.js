'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: Sequelize.STRING(200),
        allowNull: false,
        validate: {
          len: [4, 200],
          isEmail: true,
        },
      },
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
        validate: {
          len: [10, 128],
        },
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user');
  },
};

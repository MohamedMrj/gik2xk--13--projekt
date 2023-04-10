'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('rating', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rating: {
        type: Sequelize.DOUBLE(),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('rating');
  },
};

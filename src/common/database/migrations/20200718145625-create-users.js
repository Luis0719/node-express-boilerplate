'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      first_name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(60),
      },
      image: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
      },
      phone: {
        type: Sequelize.STRING(15),
      },
      roles: {
        type: Sequelize.ARRAY(Sequelize.STRING(20)),
        defaultValue: [],
      },
      created_at: {
        type: Sequelize.DATE,
      },
      updated_at: {
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users', {
      cascade: true,
    });
  },
};

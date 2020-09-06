'use strict';
const tableName = 'role_actions';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
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

    await queryInterface.addColumn(tableName, 'role', {
      type: Sequelize.STRING(20),
      references: {
        model: 'roles',
        key: 'name',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addColumn(tableName, 'action_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'actions',
        key: 'id',
      },
      onDelete: 'CASCADE',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable(tableName, {
      cascade: true,
    });
  },
};

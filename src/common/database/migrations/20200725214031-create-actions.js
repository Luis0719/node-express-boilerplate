'use strict';
const tableName = 'actions';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      tableName,
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        uri: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        method: {
          type: Sequelize.STRING(7),
          defaultValue: 'get',
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING,
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
      },
      {
        uniqueKeys: {
          actions_unique: {
            fields: ['uri', 'method'],
          },
        },
      }
    );

    await queryInterface.addColumn(tableName, 'group_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'action_groups',
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

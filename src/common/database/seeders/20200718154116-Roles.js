'use strict';
const tableName = 'roles';
const defaultValues = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        name: 'admin',
        ...defaultValues,
      },
      {
        name: 'radiologo',
        ...defaultValues,
      },
      {
        name: 'tecnico',
        ...defaultValues,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  },
};

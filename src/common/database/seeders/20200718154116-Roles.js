"use strict";
const tableName = "roles";
const defaultValues = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        id: 0,
        name: "admin",
        ...defaultValues,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(tableName, null, {});
  },
};

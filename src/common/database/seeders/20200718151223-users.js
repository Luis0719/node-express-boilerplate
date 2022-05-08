"use strict";
const bcrypt = require("../../crypto");
const tableName = "users";
const defaultValues = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        first_name: "admin",
        last_name: "",
        email: "admin@test.com",
        username: "admin",
        password: await bcrypt.hash("admin"),
        roles: [0],
        ...defaultValues,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  },
};

'use strict';
const tableName = 'action_groups';
const defaultValues = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        name: 'Usuarios',
        description: '',
        ...defaultValues,
      },
      {
        name: 'Roles',
        description: '',
        ...defaultValues,
      },
      {
        name: 'Servicios',
        description: '',
        ...defaultValues,
      },
      {
        name: 'Pacientes',
        description: '',
        ...defaultValues,
      },
      {
        name: 'Estudios',
        description: '',
        ...defaultValues,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  },
};

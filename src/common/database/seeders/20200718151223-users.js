'use strict';
const { bcrypt } = require('common');
const tableName = 'users';
const defaultValues = {
  created_at: new Date(),
  updated_at: new Date(),
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        first_name: 'admin',
        last_name: 'MHS',
        email: 'admin@mhs.com',
        username: 'admin',
        password: await bcrypt.hash('admin'),
        roles: ['admin'],
        ...defaultValues,
      },
      {
        first_name: 'Super médico',
        last_name: 'MHS',
        email: 'supermedico@mhs.com',
        username: 'supermedico',
        password: await bcrypt.hash('supermedico'),
        roles: ['tecnico', 'radiologo'],
        ...defaultValues,
      },
      {
        first_name: 'radiologo',
        last_name: 'MHS',
        email: 'radiologo@mhs.com',
        username: 'radiologo',
        password: await bcrypt.hash('radiologo'),
        roles: ['radiologo'],
        ...defaultValues,
      },
      {
        first_name: 'técnico',
        last_name: 'MHS',
        email: 'tecnico@mhs.com',
        username: 'tecnico',
        password: await bcrypt.hash('tecnico'),
        roles: ['tecnico'],
        ...defaultValues,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  },
};

'use strict';
const tableName = 'actions';
const prefix = '/api/v1';

const defaultValues = {
  created_at: new Date(),
  updated_at: new Date(),
};

const buildRoute = path => {
  return `${prefix}/${path}`;
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(tableName, [
      {
        uri: buildRoute('users'),
        method: 'get',
        name: 'Ver usuarios',
        description: 'Ver lista de todos los usuarios',
        group_id: 1,
        ...defaultValues,
      },
      {
        uri: buildRoute('users/{id}'),
        method: 'get',
        name: 'Ver usuario',
        description: 'Ver detalles de un usuario',
        group_id: 1,
        ...defaultValues,
      },
      {
        uri: buildRoute('users/store'),
        method: 'post',
        name: 'Crear usuario',
        description: 'Crear nuevo usuario',
        group_id: 1,
        ...defaultValues,
      },
      {
        uri: buildRoute('users/update/{id}'),
        method: 'update',
        name: 'Editar usuario',
        description: 'Actualizar unformación de un usuario',
        group_id: 1,
        ...defaultValues,
      },
      {
        uri: buildRoute('users/delete/{id}'),
        method: 'delete',
        name: 'Eliminar usuario',
        description: 'Actualizar unformación de un usuario',
        group_id: 1,
        ...defaultValues,
      },

      {
        uri: buildRoute('roles'),
        method: 'get',
        name: 'Ver roles',
        description: 'Ver lista de todos los roles',
        group_id: 2,
        ...defaultValues,
      },
      {
        uri: buildRoute('roles/{id}'),
        method: 'get',
        name: 'Ver rol',
        description: 'Ver detalles de un rol',
        group_id: 2,
        ...defaultValues,
      },
      {
        uri: buildRoute('roles/store'),
        method: 'post',
        name: 'Crear rol',
        description: 'Crear nuevo rol',
        group_id: 2,
        ...defaultValues,
      },
      {
        uri: buildRoute('roles/update/{id}'),
        method: 'update',
        name: 'Editar rol',
        description: 'Actualizar unformación de un rol',
        group_id: 2,
        ...defaultValues,
      },
      {
        uri: buildRoute('roles/delete/{id}'),
        method: 'delete',
        name: 'Eliminar rol',
        description: 'Actualizar unformación de un rol',
        group_id: 2,
        ...defaultValues,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(tableName, null, {});
  },
};

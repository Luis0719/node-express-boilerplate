const { Users } = require("../../../../src/common/database").models;

const defaultAttrs = {
  first_name: "firstname",
  last_name: "lastname",
  username: "test",
  password: "testpass",
};
/**
 * Forces password hashing before save
 * @param  {Sequelize.Model.Users} instance
 * @return {Promise}
 */
function preSave(instance) {
  // Hash password before storing
  return instance.setPassword(defaultAttrs.password);
}

module.exports = {
  Model: Users,
  defaultAttrs,
  hooks: {
    preSave,
  },
};

const { Users } = require("../../common/database").models;
/**
 * @param  {int} id
 * @return {Sequelize.Model.User}
 */
function findById(id) {
  return Users.findByPk(id);
}

module.exports = {
  findById,
};

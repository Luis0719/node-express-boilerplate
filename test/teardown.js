const sequelize = require("../src/common/database").connection;

module.exports = async () => {
  sequelize.close();
};

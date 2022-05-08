const envVarsPath = `config/.env.${process.env.APP_ENV || "development"}`;
require("dotenv").config({ path: envVarsPath });

const dbUtils = require("./testCommon/database/dbUtils");

module.exports = async () => {
  await dbUtils.cleanDatabase();
};

const envVarsPath = `config/.env.${process.env.APP_ENV || "development"}`;
require("dotenv").config({ path: envVarsPath });

const config = {
  development: {
    logging: console.log, // eslint-disable-line no-console
    benchmark: true,
  },
  staging: {},
  production: {},
  common: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'postgres',
    logging: false,
    protocol: null,
    benchmark: false,
    pool: {
      max: 5,
      idle: 10000,
      acquire: 30000,
    },
    define: {
      paranoid: true,
      timestamps: true,
      underscored: true,
    },
  },
};

module.exports = {
  ...config.common,
  ...config[process.env.APP_ENV || 'development'],
};

const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  dialect: "postgres",
  logging: process.env.DB_DEBUG ? console.log : false, // eslint-disable-line no-console
  protocol: null,
  benchmark: process.env.DB_DEBUG,
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
};

module.exports = config;

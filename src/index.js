// Loan environment variables
require('dotenv').config({ path: `./config/.env.${process.env.NODE_ENV}` });

const { logger } = require('common').utils;
const createServer = require('./server');

createServer(logger);

// Loan environment variables
require('dotenv').config({ path: `src/config/.env.${process.env.NODE_ENV}` });

const { logger } = require('./utils');
const createServer = require('./server');

createServer(logger);

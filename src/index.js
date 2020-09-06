// Loan environment variables
require('dotenv').config({ path: `src/config/.env.${process.env.NODE_ENV}` });

// Create and load server
require('./server');

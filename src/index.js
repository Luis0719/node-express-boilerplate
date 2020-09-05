// Loan environment variables
require('dotenv').config({ path: `src/config/.env.${process.env.NODE_ENV}` })

// Load custom dependencies
require('../scripts/preinstall');

// Create and load server
require('./server');

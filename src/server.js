const express = require('express');

const app = express();
// eslint-disable-next-line import/no-unresolved
const { server: config } = require('config');

// parse incoming json data
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

// Register Routes
require('./services')(app);

// Create server
app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});

app.on('error', (error) => {
  console.log('Server error');
  throw error;
});

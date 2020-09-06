const express = require('express');
const { server: config } = require('config');

const app = express();

// parse incoming json data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Register Routes
require('./services')(app);

// Create server
app.listen(config.port);

app.on('error', (error) => {
  throw error;
});

const express = require('express');
const app = express();

const { server: config } = require('config');

// parse incoming json data
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

// Register Routes
require('./services')(app);

// Create server
app.listen(config.port, function () {
    console.log(`Server listening on port ${config.port}`);
});

app.on('error', (error) => {
    console.log("Server error");
    throw error;
});
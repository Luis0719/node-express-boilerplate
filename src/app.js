const createError = require("http-errors");
const express = require("express");

const middlewares = require("./middlewares");
const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register all middlewares
middlewares.register(app);

// Load all routes
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

module.exports = app;

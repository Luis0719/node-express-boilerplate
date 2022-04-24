const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

// List of routes
const authRoutes = require("./auth");
authRoutes.register(router);

const miscRoutes = require("./misc");
miscRoutes.register(router);
// End of routes

module.exports = router;

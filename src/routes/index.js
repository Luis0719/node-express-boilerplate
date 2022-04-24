const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

// List of routes
const miscRoutes = require("./misc");
miscRoutes.register(router);
// End of routes

module.exports = router;

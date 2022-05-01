const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

// List of routes
const healthRoutes = require("./health");
healthRoutes.register(router);

const authRoutes = require("./auth");
authRoutes.register(router);

const rolesRoutes = require("./roles");
rolesRoutes.register(router);

const usersRoutes = require("./users");
usersRoutes.register(router);
// End of routes

module.exports = router;

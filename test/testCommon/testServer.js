const server = require("../../src/app");
const supertest = require("supertest");

let testServer;
/**
 * Get fake http service
 * @return {Supertest} testServer
 */
function getTestServer() {
  if (!testServer) {
    testServer = supertest(server);
  }

  return testServer;
}

module.exports = {
  getTestServer,
};

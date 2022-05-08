const server = require("../testCommon/testServer").getTestServer();

describe("Misc Endpoints", () => {
  test("GET /ping should show server info", async () => {
    const res = await server.get("/ping");
    expect(res.status).toEqual(200);
  });
});

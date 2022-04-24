const server = require('../../src/app');
const supertest = require('supertest');
//TODO(): Should this be moved to a singleton class to avoid
// creating a server instance for each test?
const requestWithSupertest = supertest(server);

describe('Misc Endpoints', () => {
  it('GET /ping should show server info', async () => {
    const res = await requestWithSupertest.get('/ping');
    expect(res.status).toEqual(200);
  });
});
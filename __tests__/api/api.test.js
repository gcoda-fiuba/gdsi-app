const request = require('supertest');

const BASE_URL = 'http://localhost:3000'; // URL del servidor existente

describe('Endpoint testing', () => {
  it('GET /groups', async () => {
    const res = await request(BASE_URL).get('/groups');
    expect(res.statusCode).toBe(200);
  });

  it('GET non-existent endpoint should return 404', async () => {
    const res = await request(BASE_URL).get('/banana');
    expect(res.statusCode).toBe(404);
  });
});

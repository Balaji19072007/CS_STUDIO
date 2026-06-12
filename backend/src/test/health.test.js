import { describe, it, expect, afterAll } from 'vitest';
import supertest from 'supertest';
import { app, server } from '../../server.js';

const request = supertest(app);

afterAll(() => {
  server.close();
});

describe('Health Check Endpoint', () => {
  it('GET /api/health returns 200 or 503', async () => {
    const res = await request.get('/api/health');
    expect([200, 503]).toContain(res.status);
  });

  it('GET /api/health returns correct shape', async () => {
    const res = await request.get('/api/health');
    expect(res.body).toHaveProperty('status');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('version');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('environment');
    expect(res.body).toHaveProperty('checks');
    expect(res.body.checks).toHaveProperty('database');
  });
});

describe('Controller Module Imports', () => {
  it('leaderboardController loads without error', async () => {
    await expect(import('../../controllers/leaderboardController.js')).resolves.toBeDefined();
  });

  it('notificationController loads without error', async () => {
    await expect(import('../../controllers/notificationController.js')).resolves.toBeDefined();
  });
});

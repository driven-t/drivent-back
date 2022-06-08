import app, { init } from '@/app';
import supertest from 'supertest';
import { generateValidToken } from '../helpers';
import httpStatus from 'http-status';

const server = supertest(app);

describe('GET /hotels', () => {
  it('Should return status code 200 and the hotels', async () => {
    const token = generateValidToken();

    const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.length).toBe(3);
  });
});

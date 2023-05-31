const request = require('supertest');
const app = require('../index');

describe('Users routes', () => {
    test('GET /users should return status 200', async () => {
      const response = await request(app).get('/users');
      expect(response.statusCode).toBe(200);
    });
  
    test('POST /users should return status 201', async () => {
      const response = await request(app).post('/users');
      expect(response.statusCode).toBe(201);
    });
  
    // Agrega más pruebas para otras rutas y métodos HTTP según sea necesario
  });
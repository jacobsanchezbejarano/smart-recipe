const request = require('supertest');
const express = require('express');
const app = require('../index');
const routes = express.Router();



app.use('/recipe', routes.use('/recipes',require('../routes/recipes')))

describe('Good Home Routes', function () {

  test('responds to /', async () => {
    const res = await request(app)
    .get('/');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    // expect(res.body).toEqual('hello world!');
  });

});
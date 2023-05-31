const request = require('supertest');
const express = require('express');
const router = require('../routes/recipes.js');

const app = new express();
app.use('/recipes', router);

describe('Good Home Routes', function () {

  test('responds to /', async () => {
    const res = await request(app).get('/recipes');
    //expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(200);
    //expect(res.text).toEqual('hello world!');
  });
});
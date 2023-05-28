const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
  it('responds with "Logged Out" when user is not logged in', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(401);
    expect(response.text).toBe('Logged Out');
  });

  it('responds with "Logged in as [displayName]" when user is logged in', async () => {
    const loggedInUser = { displayName: 'John Doe' };
    const agent = request.agent(app);
    await agent.get('/github/callback').send(loggedInUser);

    const response = await agent.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Logged in as John Doe');
  });
});
/*

describe('Good Home Routes', function () {

  test('responds to /users', async () => {
    const res = await request(app).get('/users');
    expect(res.header['content-type']).toBe('application/json; charset=utf-8');
    expect(res.statusCode).toBe(200);
    // expect(res.text).toEqual([
    //     {
    //       "_id": "64682d42aa00cfdafc29e56a",
    //       "password": "Uribe",
    //       "address": "1200 e 1880 w, 84005",
    //       "phone": "8018008955",
    //       "email": "Jonathan@gmail.com",
    //       "user_name": "Jonathan"
    //     }
    //   ]);
  });
});

*/
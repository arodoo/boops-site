import request from 'supertest'
import app from '../index'

describe('User Routes', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('uid')
  })

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('uid')
  })
})

import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able refresh a token', async () => {
    await request(app.server).post('/organizations').send({
      password: 'MY_PASSWORD',
      name: "John Doe Pet's Organization",
      responsible: 'John Doe',
      city: 'Joinville',
      email: 'johndoe@example.com',
      phone: '+5547123456789',
    })

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({
        password: 'MY_PASSWORD',
        email: 'johndoe@example.com',
      })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch(`/organizations/token/refresh`)
      .set('Cookie', cookies)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})

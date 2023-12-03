import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an organization', async () => {
    await request(app.server).post('/organizations').send({
      password: 'MY_PASSWORD',
      name: "John Doe Pet's Organization",
      responsible: 'John Doe',
      city: 'Joinville',
      email: 'johndoe@example.com',
      phone: '+5547123456789',
    })

    const response = await request(app.server)
      .post('/organizations/sessions')
      .send({
        password: 'MY_PASSWORD',
        email: 'johndoe@example.com',
      })

    expect(response.statusCode).toEqual(200)
    expect(response.body.token).toEqual(expect.any(String))
    // expect(response.body.token).toEqual(expect.any(String))
  })
})

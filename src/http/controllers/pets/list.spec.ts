import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('List pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list pets with filters', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Tom',
        description: 'Moraes',
        age: 'PUPPY',
        size: 'LG',
        energy: 'MEDIUM',
        independency: 'LOW',
        environment: 'LG',
      })

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Bebel',
        description: 'Charmosa',
        age: 'ADULT',
        size: 'MD',
        energy: 'MEDIUM',
        independency: 'HIGH',
        environment: 'MD',
      })

    const response = await request(app.server)
      .get('/pets')
      .set('Authorization', `Bearer ${token}`)
      .query({
        city: 'Joinville',
        age: 'ADULT',
      })

    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Bebel',
      }),
    ])
  })
})

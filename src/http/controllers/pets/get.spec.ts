import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able retrieve a pet', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const petCreationResponse = await request(app.server)
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

    const response = await request(app.server)
      .get(`/pets/${petCreationResponse.body.pet.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        id: petCreationResponse.body.pet.id,
        organization: expect.objectContaining({
          city: expect.any(String),
          phone: expect.any(String),
        }),
        name: 'Tom',
      }),
    )
  })
})

import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUser(app: FastifyInstance) {
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

  const { token } = authResponse.body

  return { token }
}

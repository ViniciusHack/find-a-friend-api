import { FastifyInstance } from 'fastify'
import { createPetController } from './create'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', createPetController)
}

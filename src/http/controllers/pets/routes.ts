import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { createPetController } from './create'
import { listPetsController } from './list'

export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: verifyJWT }, createPetController)
  app.get('/pets', listPetsController)
}

import { FastifyInstance } from 'fastify'
import { createOrganization } from './create'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', createOrganization)
}

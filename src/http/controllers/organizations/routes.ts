import { FastifyInstance } from 'fastify'
import { authenticateOrganizationController } from './authenticate'
import { createOrganizationController } from './create'
import { refreshController } from './refresh'

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', createOrganizationController)
  app.post('/organizations/sessions', authenticateOrganizationController)
  app.patch('/organizations/token/refresh', refreshController)
}

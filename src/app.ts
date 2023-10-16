import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { organizationRoutes } from './http/controllers/organizations/routes'
import { petRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(organizationRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation Error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // Log the error to an external tool DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})

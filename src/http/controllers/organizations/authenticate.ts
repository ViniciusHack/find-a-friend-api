import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateOrganizationBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export function authenticateOrganizationController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { email, password } = authenticateOrganizationBodySchema.parse(req.body)

  return reply.status(200).send()
}

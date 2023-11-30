import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createOrganizationBodySchema = z.object({
  password: z.string(),
  name: z.string(),
  responsible: z.string(),
  city: z.string(),
  email: z.string().email(),
  phone: z.string(),
})

export async function createOrganizationController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const data = createOrganizationBodySchema.parse(req.body)

  const createOrganizationUseCase = makeCreateOrganizationUseCase()
  const { organization } = await createOrganizationUseCase.execute(data)

  return reply.status(201).send({
    organization,
  })
}

import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
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
  try {
    const data = createOrganizationBodySchema.parse(req.body)

    const createOrganizationUseCase = makeCreateOrganizationUseCase()
    const { organization } = await createOrganizationUseCase.execute(data)

    return reply.status(201).send({
      organization: {
        id: organization.id,
      },
    })
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(err.code).send({ message: err.message })
    }
    return reply.status(400).send(err)
  }
}

import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createPetBodySchema = z.object({
  name: z.string(),
  description: z.string().max(300),
  age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
  size: z.enum(['SM', 'MD', 'LG']),
  energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  independency: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  environment: z.enum(['SM', 'MD', 'LG']),
})

export async function createPetController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, description, age, size, energy, independency, environment } =
    createPetBodySchema.parse(req.body)

  const organizationId = req.user.sub

  try {
    const createPetUseCase = makeCreatePetUseCase()
    const { pet } = await createPetUseCase.execute({
      name,
      description,
      age,
      size,
      energy,
      independency,
      environment,
      organizationId,
    })
    return reply.status(201).send({
      pet,
    })
  } catch (err) {
    return reply.status(400).send(err)
  }
}

import { makeCreatePetUseCase } from '@/useCases/factories/make-create-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createPetBodySchema = z.object({
  name: z.string(),
  description: z.string().max(300),
  age: z.enum(['PUPPY', 'ADULT', 'SENIOR']),
  size: z.enum(['XS', 'SM', 'MD', 'LG', 'XL']),
  energy: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  independency: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  environment: z.enum(['SM', 'MD', 'LG']),
})

export async function createPet(req: FastifyRequest, reply: FastifyReply) {
  const { name, description, age, size, energy, independency, environment } =
    createPetBodySchema.parse(req.body)

  const organizationId = 'TO-DO'

  try {
    const createPetUseCase = makeCreatePetUseCase()
    await createPetUseCase.execute({
      name,
      description,
      age,
      size,
      energy,
      independency,
      environment,
      organizationId,
    })
  } catch (err) {
    throw err
  }

  return reply.status(201).send()
}

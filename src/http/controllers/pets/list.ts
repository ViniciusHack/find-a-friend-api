import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeListPetsUseCase } from '@/use-cases/factories/make-list-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const listPetsQuerySchema = z.object({
  city: z.string(),
  age: z.enum(['PUPPY', 'ADULT', 'SENIOR']).optional(),
  size: z.enum(['SM', 'MD', 'LG']).optional(),
  energy: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  independency: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
  environment: z.enum(['SM', 'MD', 'LG']).optional(),
})

export async function listPetsController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const listPetsUseCase = makeListPetsUseCase()

    const filters = listPetsQuerySchema.parse(req.query)
    console.log({ ...filters })
    const pets = await listPetsUseCase.execute({ ...filters })

    return reply.status(200).send({ pets })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(err.code).send({ message: err.message })
    }
    return reply.status(400).send({ err })
  }
}

import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const getPetParamSchema = z.object({
  id: z.string().uuid(),
})

export async function getPetController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getPetUseCase = makeGetPetUseCase()

    const { id } = getPetParamSchema.parse(req.params)
    const pet = await getPetUseCase.execute({ id })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(err.code).send({ message: err.message })
    }
    return reply.status(400).send({ err })
  }
}

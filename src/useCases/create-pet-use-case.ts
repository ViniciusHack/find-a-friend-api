import { PetRepository } from '@/repositories/pets-repository'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type CreatePetParams = Prisma.PetUncheckedCreateInput

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({
    name,
    age,
    description,
    energy,
    environment,
    independency,
    organizationId,
    size,
  }: CreatePetParams) {
    const orgFound = true

    if (!orgFound) {
      throw new ResourceNotFoundError()
    }

    await this.petRepository.create({
      name,
      age,
      description,
      energy,
      environment,
      independency,
      organizationId,
      size,
    })
  }
}

import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

type CreatePetParams = Prisma.PetUncheckedCreateInput

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

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
    const organization =
      await this.organizationsRepository.findById(organizationId)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      age,
      description,
      energy,
      environment,
      independency,
      organizationId,
      size,
    })

    return { pet }
  }
}

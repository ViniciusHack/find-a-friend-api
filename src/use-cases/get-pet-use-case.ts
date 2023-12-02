import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface GetPetUseCaseParams {
  id: string
}

export class GetPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({ id }: GetPetUseCaseParams) {
    const petReturn = await this.petsRepository.findById(id)

    if (!petReturn) {
      throw new ResourceNotFoundError()
    }

    const organization = await this.organizationsRepository.findById(
      petReturn.organizationId,
    )

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    Reflect.deleteProperty(petReturn, 'organizationId')
    Reflect.deleteProperty(organization, 'password')
    return {
      ...petReturn,
      organization,
    }
  }
}

import { PetsRepository } from '@/repositories/pets-repository'
import {
  PetAge,
  PetEnergy,
  PetEnvironment,
  PetIndependency,
  PetSize,
} from '@prisma/client'

interface ListPetsUseCaseParams {
  city: string
  age?: PetAge
  energy?: PetEnergy
  independency?: PetIndependency
  size?: PetSize
  environment?: PetEnvironment
}

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy,
    environment,
    independency,
    size,
  }: ListPetsUseCaseParams) {
    const pets = await this.petsRepository.findMany({
      city,
      age,
      energy,
      environment,
      independency,
      size,
    })

    return pets
  }
}

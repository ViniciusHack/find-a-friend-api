import { PrismaPetRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '@/useCases/create-pet-use-case'

export function makeCreatePetUseCase() {
  const petRepository = new PrismaPetRepository()

  const createPetUseCase = new CreatePetUseCase(petRepository)

  return createPetUseCase
}

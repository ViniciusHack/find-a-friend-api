import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ListPetsUseCase } from '../list-pets-use-case'

export function makeListPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()

  const listPetsUseCase = new ListPetsUseCase(petsRepository)

  return listPetsUseCase
}

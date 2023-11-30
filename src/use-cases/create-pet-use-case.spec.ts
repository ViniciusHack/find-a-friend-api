import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Prisma } from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet-use-case'

let sut: CreatePetUseCase
let organizationsRepository: OrganizationsRepository
let petsRepository: PetsRepository

describe('Create Pet Use Case Suite', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreatePetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to create a pet successfully', async () => {
    const payload: Prisma.PetUncheckedCreateInput = {
      age: 'ADULT',
      description: 'Lindo cachorrinho amável',
      energy: 'MEDIUM',
      environment: 'SM',
      independency: 'LOW',
      name: 'Belinha',
      size: 'MD',
      organizationId: '1231312',
    }
    const { pet } = await sut.execute(payload)

    expect(pet).toHaveProperty('id')
  })
})

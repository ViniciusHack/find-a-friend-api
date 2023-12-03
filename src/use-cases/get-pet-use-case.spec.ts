import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPetUseCase } from './get-pet-use-case'

let sut: GetPetUseCase
let petsRepository: PetsRepository
let organizationsRepository: OrganizationsRepository

describe('List Pets Use Case suite', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new GetPetUseCase(petsRepository, organizationsRepository)
  })

  it('should be get a pet by id', async () => {
    const { id } = await organizationsRepository.create({
      city: 'Joinville',
      email: 'john@doe.com',
      name: `John Doe's Org`,
      password: '123456',
      phone: '+5547123456789',
      responsible: 'John Doe',
    })

    const pet = await petsRepository.create({
      age: 'ADULT',
      description: 'Lindo cachorrinho amável',
      energy: 'MEDIUM',
      environment: 'SM',
      independency: 'LOW',
      name: 'Belinha De Joinville',
      size: 'MD',
      organizationId: id,
    })

    const petReturn = await sut.execute({
      id: pet.id,
    })

    expect(petReturn).toEqual(
      expect.objectContaining({
        name: 'Belinha De Joinville',
        organization: expect.objectContaining({
          id,
          phone: '+5547123456789',
          name: `John Doe's Org`,
        }),
        id: pet.id,
      }),
    )
  })

  it("should return pet not found when the id doesn't exists", async () => {
    expect(
      async () =>
        await sut.execute({
          id: 'NOT_EXISTENT_ID',
        }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})

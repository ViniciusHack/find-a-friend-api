import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ListPetsUseCase } from './list-pets-use-case'

const petsMock = [
  {
    age: 'ADULT',
    size: 'SM',
    energy: 'MEDIUM',
    environment: 'SM',
    independency: 'LOW',
    name: 'Belinha De Joinville',
  },
  {
    age: 'PUPPY',
    size: 'MD',
    energy: 'HIGH',
    environment: 'LG',
    independency: 'LOW',
    name: 'Totó',
  },
  {
    age: 'ADULT',
    size: 'MD',
    energy: 'HIGH',
    environment: 'SM',
    independency: 'HIGH',
    name: 'Laika',
  },
  {
    age: 'ADULT',
    size: 'SM',
    energy: 'LOW',
    environment: 'LG',
    independency: 'LOW',
    name: 'Lola De Joinville',
  },
  {
    age: 'ADULT',
    size: 'SM',
    energy: 'MEDIUM',
    environment: 'LG',
    independency: 'LOW',
    name: 'Odie',
  },
] as const

let sut: ListPetsUseCase
let petsRepository: PetsRepository
let organizationsRepository: OrganizationsRepository

describe('List Pets Use Case suite', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new ListPetsUseCase(petsRepository)
  })

  it('should be able to list pets by city', async () => {
    const { id: JoinvilleOrganizationId } =
      await organizationsRepository.create({
        city: 'Joinville',
        email: 'john@doe.com',
        name: `John Doe's Org`,
        password: '123456',
        phone: '+5547123456789',
        responsible: 'John Doe',
      })

    const { id: SaoPauloOrganizationId } = await organizationsRepository.create(
      {
        city: 'São Paulo',
        email: 'john2@doe.com',
        name: `John Doe's Org 2`,
        password: '123456',
        phone: '+551111111111',
        responsible: 'John Doe 2',
      },
    )

    await petsRepository.create({
      age: 'ADULT',
      description: 'Lindo cachorrinho amável',
      energy: 'MEDIUM',
      environment: 'SM',
      independency: 'LOW',
      name: 'Belinha De são paulo',
      size: 'MD',
      organizationId: SaoPauloOrganizationId,
    })

    await petsRepository.create({
      age: 'ADULT',
      description: 'Lindo cachorrinho amável',
      energy: 'MEDIUM',
      environment: 'SM',
      independency: 'LOW',
      name: 'Belinha De Joinville',
      size: 'MD',
      organizationId: JoinvilleOrganizationId,
    })

    const pets = await sut.execute({
      city: 'Joinville',
    })

    expect(pets.length).toEqual(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Belinha De Joinville',
      }),
    ])
  })

  it('should be able to filters pets by adjectives', async () => {
    const { id: JoinvilleOrganizationId } =
      await organizationsRepository.create({
        city: 'Joinville',
        email: 'john@doe.com',
        name: `John Doe's Org`,
        password: '123456',
        phone: '+5547123456789',
        responsible: 'John Doe',
      })

    const { id: SaoPauloOrganizationId } = await organizationsRepository.create(
      {
        city: 'São Paulo',
        email: 'john2@doe.com',
        name: `John Doe's Org 2`,
        password: '123456',
        phone: '+551111111111',
        responsible: 'John Doe 2',
      },
    )

    petsRepository.create({
      age: 'ADULT',
      description: 'Lindo cachorrinho amável',
      energy: 'MEDIUM',
      environment: 'SM',
      independency: 'LOW',
      name: 'Belinha De são paulo',
      size: 'MD',
      organizationId: SaoPauloOrganizationId,
    })

    for (const pet of petsMock) {
      await petsRepository.create({
        ...pet,
        description: 'generic',
        organizationId: JoinvilleOrganizationId,
      })
    }

    const petsFiltered1 = await sut.execute({
      city: 'São Paulo',
      independency: 'HIGH',
    })
    const petsFiltered2 = await sut.execute({
      city: 'Joinville',
      age: 'ADULT',
      size: 'SM',
    })
    const petsFiltered3 = await sut.execute({
      city: 'Joinville',
      age: 'ADULT',
      size: 'SM',
      energy: 'MEDIUM',
    })

    const petsFiltered4 = await sut.execute({
      city: 'Joinville',
      age: 'ADULT',
      size: 'SM',
      energy: 'MEDIUM',
      environment: 'SM',
    })

    expect(petsFiltered1.length).toEqual(0)
    expect(petsFiltered2).toEqual([
      expect.objectContaining({
        name: 'Belinha De Joinville',
      }),
      expect.objectContaining({
        name: 'Lola De Joinville',
      }),
      expect.objectContaining({
        name: 'Odie',
      }),
    ])
    expect(petsFiltered3).toEqual([
      expect.objectContaining({
        name: 'Belinha De Joinville',
      }),
      expect.objectContaining({
        name: 'Odie',
      }),
    ])

    expect(petsFiltered4).toEqual([
      expect.objectContaining({
        name: 'Belinha De Joinville',
      }),
    ])
  })
})

import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrganizationsRepository } from '../organizations-repository'
import { FindManyPetsParams, PetsRepository } from '../pets-repository'
export class InMemoryPetsRepository implements PetsRepository {
  private items: Pet[] = []
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      ...data,
      createdAt: new Date(),
    }

    this.items.push(pet)
    return pet
  }

  async findMany(data: FindManyPetsParams): Promise<Pet[]> {
    const petsFiltered: Pet[] = []

    for (const pet of this.items) {
      const adjectivesFilter = Object.entries(data).filter(
        ([key, value]) => key !== 'city' && value !== undefined,
      ) as [
        'age' | 'size' | 'environment' | 'independency' | 'energy',
        string,
      ][]

      const adjectivesThatMatches = adjectivesFilter.filter(
        ([key, value]) => pet[key] === value,
      )

      const organization = await this.organizationsRepository.findById(
        pet.organizationId,
      )
      const cityMatches = organization?.city === data.city

      if (
        adjectivesThatMatches.length === adjectivesFilter.length &&
        cityMatches
      ) {
        petsFiltered.push(pet)
      }
    }

    return petsFiltered
  }

  async findById(id: string) {
    return this.items.find((pet) => pet.id === id) ?? null
  }
}

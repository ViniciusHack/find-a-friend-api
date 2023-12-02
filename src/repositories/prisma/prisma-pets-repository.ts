import { prisma } from '@/lib/prisma'
import { Pet, Prisma } from '@prisma/client'
import { FindManyPetsParams, PetsRepository } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findMany(data: FindManyPetsParams) {
    let filters = `WHERE TRUE`

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'city' && value !== undefined) {
        filters += ` AND pets.${key} = '${value}'`
      }
    })

    const pets: Pet[] = await prisma.$queryRaw`
      SELECT pets.* FROM pets
      INNER JOIN organizations on organizations.id = pets.organization_id AND organizations.city = ${
        data.city
      }
      ${filters !== 'WHERE TRUE' ? Prisma.raw(filters) : Prisma.empty}
    `

    return pets
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }
}

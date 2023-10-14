import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetRepository } from '../pets-repository'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}

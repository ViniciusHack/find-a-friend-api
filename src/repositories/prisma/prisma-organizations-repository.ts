import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationRepository {
  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }

  async findByPhone(phone: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        phone,
      },
    })

    return organization
  }
}

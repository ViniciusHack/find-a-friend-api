import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  private items: Organization[] = []

  async create(data: Prisma.OrganizationUncheckedCreateInput) {
    const organization: Organization = {
      ...data,
      id: randomUUID(),
    }

    this.items.push(organization)
    return organization
  }

  async findByPhone(phone: string) {
    const organizationFound =
      this.items.find((organization) => organization.phone === phone) ?? null

    return organizationFound
  }

  async findByEmail(email: string) {
    const organizationFound =
      this.items.find((organization) => organization.email === email) ?? null

    return organizationFound
  }

  async findById(id: string) {
    const organizationFound =
      this.items.find((organization) => organization.id === id) ?? null

    return organizationFound
  }
}

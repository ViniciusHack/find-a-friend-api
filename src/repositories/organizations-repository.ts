import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByPhone(phone: string): Promise<Organization | null>
  findByEmail(email: string): Promise<Organization | null>
}

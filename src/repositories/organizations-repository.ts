import { Organization, Prisma } from '@prisma/client'

export interface OrganizationRepository {
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
  findByPhone(phone: string): Promise<Organization | null>
}
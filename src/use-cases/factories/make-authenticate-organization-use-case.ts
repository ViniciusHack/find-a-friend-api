import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'
import { AuthenticateOrganizationUseCase } from '../authenticate-organization-use-case'

export function makeAuthenticateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const authenticateOrganizationUseCase = new AuthenticateOrganizationUseCase(
    organizationsRepository,
  )

  return authenticateOrganizationUseCase
}

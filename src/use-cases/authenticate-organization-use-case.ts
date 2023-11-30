import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { compare } from 'bcryptjs'
import { OrganizationInvalidCredentialsError } from './errors/organization-invalid-credentials-error'

interface AuthenticateOrganizationUseCaseData {
  email: string
  password: string
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({ email, password }: AuthenticateOrganizationUseCaseData) {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new OrganizationInvalidCredentialsError()
    }

    const doesPasswordMatch = await compare(password, organization.password)

    if (!doesPasswordMatch) {
      throw new OrganizationInvalidCredentialsError()
    }

    return { organization }
  }
}

import { OrganizationRepository } from '@/repositories/organizations-repository'
import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

type CreateOrganizationUseCaseParams = Prisma.OrganizationUncheckedCreateInput

export class CreateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationRepository) {}

  async execute({
    address,
    email,
    name,
    password,
    phone,
    responsible,
  }: CreateOrganizationUseCaseParams) {
    const organizationAlreadyExists =
      await this.organizationsRepository.findByPhone(phone)

    if (organizationAlreadyExists) {
      throw new OrganizationAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    await this.organizationsRepository.create({
      address,
      email,
      name,
      password: passwordHash,
      phone,
      responsible,
    })
  }
}

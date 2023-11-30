import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateOrganizationUseCase } from './authenticate-organization-use-case'
import { OrganizationInvalidCredentialsError } from './errors/organization-invalid-credentials-error'

let sut: AuthenticateOrganizationUseCase
let organizationsRepository: OrganizationsRepository

describe('Authenticate Organization Use Case suite', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to authenticate an organization successfully', async () => {
    await organizationsRepository.create({
      city: 'Joinville',
      email: 'john@doe.com',
      name: `John Doe's Org`,
      password: await hash('123456', 6),
      phone: '+5547123456789',
      responsible: 'John Doe',
    })

    const { organization } = await sut.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(organization).toHaveProperty('id')
  })

  it('should not be able to authenticate an organization with wrong email', async () => {
    await organizationsRepository.create({
      city: 'Joinville',
      email: 'john@doe.com',
      name: `John Doe's Org`,
      password: '123456',
      phone: '+5547123456789',
      responsible: 'John Doe',
    })

    expect(
      async () =>
        await sut.execute({
          email: 'wrong@email.com',
          password: '123456',
        }),
    ).rejects.toBeInstanceOf(OrganizationInvalidCredentialsError)
  })

  it('should not be able to authenticate an organization with wrong password', async () => {
    await organizationsRepository.create({
      city: 'Joinville',
      email: 'john@doe.com',
      name: `John Doe's Org`,
      password: '123456',
      phone: '+5547123456789',
      responsible: 'John Doe',
    })

    expect(
      async () =>
        await sut.execute({
          email: 'john@doe.com',
          password: 'WRONG_PASSWORD',
        }),
    ).rejects.toBeInstanceOf(OrganizationInvalidCredentialsError)
  })
})

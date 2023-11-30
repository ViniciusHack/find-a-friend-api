import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization-use-case'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let sut: CreateOrganizationUseCase
let organizationsRepository: OrganizationsRepository

describe('Create Organization Use Case suite', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationsRepository)
  })

  it('should be able to create organization successfully', async () => {
    const { organization } = await sut.execute({
      city: 'Joinville',
      email: 'john@doe.com',
      name: `John Doe's Org`,
      password: '123456',
      phone: '+5547123456789',
      responsible: 'John Doe',
    })

    expect(organization).toHaveProperty('id')
  })

  it('should not be able to create organization when the phone already has been used', async () => {
    await sut.execute({
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
          city: 'Joinville',
          email: 'john2@doe.com',
          name: `John Doe's Org 2`,
          password: '123456',
          phone: '+5547123456789',
          responsible: 'John Doe 2',
        }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})

export class OrganizationInvalidCredentialsError extends Error {
  public readonly code = 401
  constructor() {
    super('Organization invalid credentials.')
  }
}

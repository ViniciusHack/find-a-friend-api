export class OrganizationAlreadyExistsError extends Error {
  public readonly code = 400
  constructor() {
    super(`Organization already exists.`)
  }
}

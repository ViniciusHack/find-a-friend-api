export class ResourceNotFoundError extends Error {
  public readonly code = 404

  constructor() {
    super('Resource not found.')
  }
}

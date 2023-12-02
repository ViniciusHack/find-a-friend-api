import { OrganizationInvalidCredentialsError } from '@/use-cases/errors/organization-invalid-credentials-error'
import { makeAuthenticateOrganizationUseCase } from '@/use-cases/factories/make-authenticate-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const authenticateOrganizationBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authenticateOrganizationController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { email, password } = authenticateOrganizationBodySchema.parse(
      req.body,
    )

    const authenticateOrganizationUseCase =
      makeAuthenticateOrganizationUseCase()

    const { organization } = await authenticateOrganizationUseCase.execute({
      email,
      password,
    })

    const token = await reply.jwtSign(
      {},
      {
        sub: organization.id,
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sub: organization.id,
        expiresIn: '7d',
      },
    )

    return reply
      .status(200)
      .setCookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        path: '/',
      })
      .send({ token })
  } catch (err) {
    if (err instanceof OrganizationInvalidCredentialsError) {
      return reply.status(err.code).send({ message: err.message })
    }
    return reply.status(400).send(err)
  }
}

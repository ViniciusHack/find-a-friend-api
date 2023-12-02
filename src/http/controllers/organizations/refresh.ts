import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshController(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await req.jwtVerify({
      onlyCookie: true,
    })

    const organizationId = req.user.sub

    const token = await reply.jwtSign(
      {},
      {
        sub: organizationId,
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sub: organizationId,
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
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}

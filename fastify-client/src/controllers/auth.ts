import type { RegisterBody, LoginBody, JwtPayload } from "../routes/auth-router/shemas.js";
import { type FastifyInstance, type FastifyRequest, type FastifyReply, errorCodes } from "fastify";
import { auth_register_service, auth_login_service } from "../services/auth-service.js";
import { ExceptionsHandler, type CustomError } from "../exceptions/index.js";
import { getUser } from "../repos/users-repos.js";

export const auth_register_controller = async(req: FastifyRequest, res: FastifyReply) => {
    try {
        const result = await auth_register_service(req.body as RegisterBody)
        return res.code(201).send(result)
    } catch (err) {
        ExceptionsHandler(err as CustomError, req, res)
    }
}

export const auth_login_controller = async(req: FastifyRequest, res: FastifyReply, fastify: FastifyInstance) => {
    try {
        const data = req.body as LoginBody
        const user = await getUser({username: data.username})
        if (!user) throw new Error("404")

        const token = fastify.jwt.sign(
            { id: user.id, username: user.username, email: user.email } satisfies JwtPayload,
            { expiresIn: "1h"}
        )

        await auth_login_service(data)
        return res.code(200).send({token: token})
    } catch (err) {
        ExceptionsHandler(err as CustomError, req, res)
    }
}
import type { UserUpdateBody, UserDeleteBody, getUserBody } from "../routes/users-router/schemas.js"
import type { FastifyRequest, FastifyReply } from "fastify"
import { userServiceDelete, userServiceGetUser, userServiceUpdate } from "../services/user-service.js"
import { ExceptionsHandler, type CustomError } from "../exceptions/index.js"
import { getAllUsers } from "../repos/users-repos.js"

export const userControllerGetAllUsers = async(req: FastifyRequest, res: FastifyReply) => {
    try {
        const result = await getAllUsers()
        return res.status(200).send(result)
    } catch (error) { ExceptionsHandler(error as CustomError, req, res)}
}

export const userControllerGetUser = async(req: FastifyRequest, res: FastifyReply) => {
    try {
        const data = req.params as {id: number}
        const result = await userServiceGetUser(data)
        return res.status(200).send(result)
    } catch (error) { ExceptionsHandler(error as CustomError, req, res)}
}

export const userControllerUpdate = async(req: FastifyRequest, res: FastifyReply) => {
    try {
        if (!req.currentUser) throw new Error("401")

        const data: {id: number, email?: string, password?: string} = {id: req.currentUser.id}
        const body = req.body as UserUpdateBody
        if (body.email) data.email = body.email
        if (body.password) data.password = body.password
        await userServiceUpdate(data)
        return res.status(200).send({message: "Info updated"})
    } catch (err) {
        ExceptionsHandler(err as CustomError, req, res)
    }
}

export const userControllerDelete = async(req: FastifyRequest, res: FastifyReply) => {
    try {
        if (!req.currentUser) throw new Error("401")

        await userServiceDelete(req.body as UserDeleteBody)
        return res.status(200).send({message: "Your account deleted"})
    } catch (err) {
        ExceptionsHandler(err as CustomError, req, res)
    }
}
import prisma from "../lib/prisma.js";
import type { Prisma } from "../prisma/prisma/client.js";
import type { UserDeleteBody } from "../routes/users-router/schemas.js";

export const getAllUsers = async() => {
    const result = await prisma.user.findMany()
    return result
}

export const getUser = async(fields: {
    id?: number,
    username?: string,
    email?: string
}) => {
    const user = await prisma.user.findFirst({where: {
        OR: [
            fields.id ? { id: fields.id } : undefined,
            fields.username ? {username: fields.username} : undefined,
            fields.email ? {email: fields.email} : undefined
        ].filter(Boolean) as Prisma.UserWhereInput[]
    }})
    return user
}

export const updateUser = async(data: {
    id: number,
    email?: string,
    password?: string
}) => {
    const { id, ...updateData } = data
    const result = await prisma.user.update({
        where: {id: id},
        data: updateData
    })
    return result
}

export const deleteUser = async(data: UserDeleteBody) => {
    const result = await prisma.user.delete({
        where: data
    })
    return result
}
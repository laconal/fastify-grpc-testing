import prisma from "../lib/prisma.js"

export const validateUser = async(data: {
    username: string, password: string
}): Promise<boolean> => {
    const check = await prisma.user.findUnique({
        where: {
            username: data.username,
            password: data.password
        }
    })
    if (!check) return false
    return true
}

export const addUser = async(data: {
    username: string,
    email: string,
    password: string
}) => {
    const result = await prisma.user.create({data})
    return result
}
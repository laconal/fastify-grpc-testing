import type { getUserBody, UserDeleteBody } from "../routes/users-router/schemas.js"
import { deleteUser, getUser, updateUser } from "../repos/users-repos.js"

export const userServiceGetUser = async(data: getUserBody) => {
    const result = await getUser(data)
    if (!result) throw new Error("404")
    return result
}

export const userServiceUpdate = async(data: {
    id: number,
    email?: string,
    password?: string
}) => {
    // check if user exists
    const user = await getUser({id: data.id})
    if (!user) throw new Error("404")
    

    // check if new provided email not used by another user
    if (data.email) {
        const check = await getUser({email: data.email})
        if (check && user.id !== check.id && data.email === check.email) throw new Error("409") 
    }

    const result = await updateUser(data)
    if (!result) throw new Error("500")
    return result
}

export const userServiceDelete = async(data: UserDeleteBody) => {
    const result = await deleteUser(data)
    if (!result) throw new Error("500")
    return result
}
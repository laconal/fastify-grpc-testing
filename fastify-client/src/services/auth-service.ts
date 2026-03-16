import type { RegisterBody } from "../routes/auth-router/shemas.js";
import { addUser, validateUser } from "../repos/auth-repos.js";
import { getUser } from "../repos/users-repos.js";

export const auth_register_service = async(data: RegisterBody) => {
    const checkUserExists = await getUser({username: data.username, email: data.email})
    if (checkUserExists) throw new Error("409")

    return await addUser(data)
}

export const auth_login_service = async(data: {
    username: string, password: string
}): Promise<boolean> => {
    const login = await validateUser(data)
    if (!login) throw new Error("400")
    return true
}
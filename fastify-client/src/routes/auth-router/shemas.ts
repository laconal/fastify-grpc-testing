export interface JwtPayload {
    id: number
    username: string
    email: string
}

export interface RegisterBody {
    username: string
    email: string
    password: string
}

export interface LoginBody {
    username: string
    password: string
}

export const RegisterSchema = {
    schema: {
        body: {
            type: "object",
            required: ["username", "email", "password"],
            properties: {
                username: {type: "string"},
                email: {type: "string", format: "email"},
                password: {type: "string"}
            }
        }
    }
}

export const LoginSchema = {
    schema: {
        body: {
            type: "object",
            required: ["username", "password"],
            properties: {
                username: {type: "string"},
                password: {type: "string"}
            }
        }
    }
}


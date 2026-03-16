export interface User {
    id: number
    username: string
    email: string
    password: string,
    createdDate: Date
}

export const UserSchema = {
    tags: ["Users"],
    security: [{BearerAuth: []}],
    description: "Get information of logged user",
    response: {
        200: {
            type: "object",
            properties: {
                id: {type: "number"},
                username: {type: "string"},
                email: {type: "string", format: "email"}
            }
        }
    }
}

export const UsersSchema = {
    tags: ["Users"],
    description: "Get all users",
    response: {
        200: {
            type: "array",
            properties: {
                id: {type: "number"},
                username: {type: "string"},
                email: {type: "string"},
                books: {type: "number"}
            }
        }
    }
}

export const getUserSchema = {
    schema: {
        tags: ["Users"],
        description: "Get specific user by its id, username or email",
        // body: {
        //     type: "object",
        //     properties: {
        //         id: {type: "number"},
        //         username: {type: "string"},
        //         email: {type: "string", format: "email"}
        //     },
        //     minProperties: 1
        // }
        params: {
            type: "object",
            properties: {
                id: {type: "number"}
            }
        }
    }
}

export interface getUserBody {
    id?: number
    username?: string
    email?: string
}

export const UserUpdateSchema = {
    tags: ["Users"],
    security: [{BearerAuth: []}],
    body: {
        type: "object",
        properties: {
            email: {type: "string", format: "email"},
            password: {type: "string"}
        },
        minProperties: 1
    }
}

export interface UserUpdateBody {
    username: string
    email?: string
    password?: string
}

export const UserDeleteSchema = {
    tags: ["Users"],
    security: [{BearerAuth: []}],
    body: {
        type: "object",
        properties: {
            username: {type: "string"},
            email: {type: "string", format: "email"},
            password: {type: "string"}
        },
        required: ["username", "email", "password"]
    }
}

export interface UserDeleteBody {
    username: string
    email: string
    password: string
}

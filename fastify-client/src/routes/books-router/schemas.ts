
export interface bookInterface {
    id: number
    title: string
}

export const BooksSchema = {
    schema: {  
        tags: ["Books"],
        description: "Get all books",
        // body: {
        //     type: "array",
        //     properies: {
        //         id: {type: "number"},
        //         title: {type: "string"},
        //         authorID: {type: "string"},
        //         createdD
        //     }
        // }
    }
}

export const getBookSchema = {
    schema: {
        tags: ["Books"],
        description: "Get book by its ID",
        params: {
            type: "object",
            properties: {
                id: {type: "number"},
            },
            required: ["id"]
        }
    }
}

export const getBookByUserSchema = {
    schema: {
        tags: ["Books"],
        description: "Get books by author",
        querystring: {
            type: "object",
            properties: {
                authorID: {type: "number"},
                authorUsername: {type: "string"}
            },
            anyOf: [
                { required: ["authorID"] },
                {required: ["authorUsername"] }
            ]
        },
        response: {
            200: {
                type: "array",
                properties: {
                    id: {type: "number"},
                    title: {type: "string"}
                }
            }
        }
    }
}

export const newBookSchema = {
    tags: ["Books"],
    description: "Add new book",
    security: [{BearerAuth: []}],
    body: {
        type: "object",
        properties: {
            title: {type: "string"}
        }
    }
}

export interface newBookInterface {
    title: string
}

export const updateBookSchema = {
    tags: ["Books"],
    description: "Change books info",
    security: [{BearerAuth: []}],
    params: {
        type: "object",
        properties: {
            id: {type: "number"}
        },
        required: ["id"]
    },
    body: {
        type: "object",
        properties: {
            title: {type: "string"}
        },
        required: ["title"]
    }
}



export const deleteBookSchema = {
    tags: ["Books"],
    description: "Delete book",
    security: [{BearerAuth: []}],
    params: {
        type: "object",
        properties: {
            id: {type: "number"}
        },
        required: ["id"]
    }
}
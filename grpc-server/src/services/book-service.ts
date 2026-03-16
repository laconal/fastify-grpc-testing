import { bookCreate, bookDelete, bookGet, bookGetAll, bookUpdate } from "../repos/book-repos.js";
import type { newBookInterface, updateInterface } from "../schemas/book-interface.js";

export const bookServiceCreate = async(data: newBookInterface) => {
    const result = await bookCreate(data.title, data.authorID)
    if (!result) throw new Error("500")
    return result
}

export const bookServiceGet = async(id: number) => {
    const result = await bookGet(id)
    if (!result) throw new Error("500")
    return result
}

export const bookServiceGetAll = async() => {
    const result = await bookGetAll()
    if (!result) throw new Error("500")
    return result
}

export const bookServiceUpdate = async(data: updateInterface) => {
    const result = await bookUpdate(data.id, data)
    return result
}

export const bookServiceDelete = async(id: number) => {
    await bookDelete(id)
}
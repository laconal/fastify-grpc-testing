import * as grpc from "@grpc/grpc-js"
import { bookServiceCreate, bookServiceDelete, bookServiceGet, bookServiceGetAll, bookServiceUpdate } from "../services/book-service.js";
import type { newBookInterface, updateInterface } from "../schemas/book-interface.js";


export const bookHandlerCreate = async(call: any, callback: any) => {
    try {
        const data = call.request as newBookInterface

        if (data.title.trim().length === 0) throw new Error("Invalid title")

        const book = await bookServiceCreate(data)
        callback(null, {id: book.id, title: book.title})
    } catch (err) { 
        console.error('REAL ERROR:', err)
        callback({ code: grpc.status.INTERNAL, message: 'Failed to create book' }) 
    }
}

export const bookHandlerGet = async(call: any, callback: any) => {
    try {
        const data = call.request.id
        const book = await bookServiceGet(data)
        callback(null, {book})
    } catch (err) { 
        console.error('REAL ERROR:', err)
        callback({ code: grpc.status.INTERNAL, message: 'Failed to get book' }) 
    }
}

export const bookHandlerGetAll = async(call: any, callback: any) => {
    try {
        const books = await bookServiceGetAll()
        callback(null, {books})
    } catch (err) { 
        console.error('REAL ERROR:', err)
        callback({ code: grpc.status.INTERNAL, message: 'Failed to get books' }) 
    }
}

export const bookHandlerUpdate = async(call: any, callback: any) => {
    try {
        const data = call.request as updateInterface
        const result = await bookServiceUpdate(data)
        callback(null, {book: result})
    } catch (err) {
        console.error("REAL ERROR:", err)
        callback({code: grpc.status.INTERNAL, message: "Failde to update"})
    }
}

export const bookHandlerDelete = async(call: any, callback: any) => {
    try {
        const data = Number(call.request.id)
        await bookServiceDelete(data)
        callback(null, {result: true})
    } catch (err) {
        console.error("REAL ERROR:", err)
        callback({code: grpc.status.INTERNAL, message: "Failed to delete"})
    }
}


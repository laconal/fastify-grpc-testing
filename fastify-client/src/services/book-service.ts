import type { newBookInterface } from "../routes/books-router/schemas.js"
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { resolve } from "node:dns";
import { number, string } from "zod";
import { id } from "zod/locales";

const packageDef = protoLoader.loadSync("src/proto/book.proto");
const proto = grpc.loadPackageDefinition(packageDef) as any;

const client = new proto.book.BookService(
  'localhost:3001',
  grpc.credentials.createInsecure()
);

// export const bookServiceGetByAuthor = async(id: number) => {
//     return await bookGetByAuthor(id)
// }
export const bookServiceGet = async(id: number) => {
    return new Promise((resolve, reject) => {
        client.getBook({id: id}, (err: any, response: any) => {
            if (err) {
                console.error("gRPC error:", JSON.stringify(err, null, 2))
                reject(err)
            } else resolve(response)
        })
    })
}

export const bookServiceGetAll = async() => {
    return new Promise((resolve, reject) => {
        client.getAllBooks({}, (err: any, response: any) => {
            if (err) {
                console.error("gRPC error:", JSON.stringify(err, null, 2))
                reject(err)
            } else resolve(response)
        })
    } )
}

export const bookServiceCreate = async(data: {}) => {
    return new Promise((resolve, reject) => {
        client.createBook(data, (err: any, response: any) => {
            if (err) {
                console.error('gRPC error:', JSON.stringify(err, null, 2))
                reject(err);
            }
            else resolve(response);
        });
    });
}


// export const bookServiceUpdate = async(data: bookInterface) => {
//     const result = await bookUpdate(data)
//     if (!result) throw "500"
//     return result
// }

export const bookServiceDelete = async(id: number) => {
    return new Promise((resolve, reject) => {
        client.deleteBook({id: id}, (err: any, response: any) => {
            if (err) {
                console.error('gRPC error:', JSON.stringify(err, null, 2))
                reject(err);
            }
            else resolve(response);
        });
    });
}

export const bookServiceUpdate = async(data: {}) => {
    return new Promise((resolve, reject) => {
        client.updateBook(data, (err: any, response: any) => {
            if (err) {
                console.error("gRPC error:", JSON.stringify(err, null, 2))
                reject(err)
            } else resolve(response)
        })
    })
}
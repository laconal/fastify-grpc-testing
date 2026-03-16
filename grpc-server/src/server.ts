import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import { bookHandlerCreate, bookHandlerDelete, bookHandlerGet, bookHandlerGetAll, bookHandlerUpdate } from "./handlers/book-handlers.js";

const packageDef = protoLoader.loadSync("src/proto/book.proto");
const proto = grpc.loadPackageDefinition(packageDef) as any;
const server = new grpc.Server()

server.addService(proto.book.BookService.service, {
    createBook: bookHandlerCreate,
    getBook: bookHandlerGet,
    getAllBooks: bookHandlerGetAll,
    updateBook: bookHandlerUpdate,
    deleteBook: bookHandlerDelete
})
server.bindAsync(
    "0.0.0.0:3001",
    grpc.ServerCredentials.createInsecure(),
    () => console.log("book-service gRPC running")
)
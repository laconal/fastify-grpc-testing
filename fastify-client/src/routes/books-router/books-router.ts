import { type FastifyPluginAsync } from "fastify"
import { getBookSchema, BooksSchema, newBookSchema, updateBookSchema, deleteBookSchema, getBookByUserSchema } from "./schemas.js"
import { authenticate } from "../../middlewares/authentication.js"
import { bookControllerCreate, bookControllerDelete, bookControllerGet, bookControllerGetAll, bookControllerUpdate } from "../../controllers/book-controller.js"

const book_routes: FastifyPluginAsync = async(fastify) => {

    fastify.get("/books", BooksSchema, bookControllerGetAll)
    fastify.get("/books/:id", getBookSchema, bookControllerGet)
    fastify.post("/books", {preHandler: authenticate, schema: newBookSchema}, bookControllerCreate)
    fastify.put("/books/:id", {preHandler: authenticate, schema: updateBookSchema}, bookControllerUpdate)
    


    // fastify.get("/books/", getBookByUserSchema, bookControllerGetBooksByAuthor)


    fastify.delete("/books/:id", {preHandler: authenticate, schema: deleteBookSchema}, bookControllerDelete)

}

export default book_routes
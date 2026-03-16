import Fastify from "fastify";
import user_routes from "./routes/users-router/users.js";
import fastifyJwt from "@fastify/jwt";
import type { User } from "./routes/users-router/schemas.js";
import { auth_routers } from "./routes/auth-router/auth.js";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import book_routes from "./routes/books-router/books-router.js";

const fastify = Fastify({logger: true})

declare module "fastify" {
    interface FastifyRequest { 
        currentUser?: User, 
        token?: string | undefined
    }
}

fastify.register(fastifyCors, {
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"]
})

// SWAGGER ui
fastify.register(fastifySwagger, {
    openapi: {
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer"
                }
            }
        }
    }
}
)
fastify.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    
})

// JWT
fastify.register(fastifyJwt, { secret: "someKey" })

fastify.get("/", function(req, rep) {
    rep.send("Server working")
})

fastify.register(user_routes, { prefix: "/api/v1"})
fastify.register(book_routes, { prefix: "/api/v1"})
fastify.register(auth_routers, {prefix: "/api/v1"})

fastify.listen({port: 3000}, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})

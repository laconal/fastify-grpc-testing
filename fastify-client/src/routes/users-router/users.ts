import { UsersSchema, UserUpdateSchema, UserDeleteSchema, UserSchema, getUserSchema  } from "./schemas.js";
import type { UserUpdateBody, UserDeleteBody, getUserBody } from "./schemas.js";
import type { FastifyPluginAsync } from "fastify";
import { authenticate } from "../../middlewares/authentication.js";
import { userControllerDelete, userControllerGetAllUsers, userControllerGetUser, userControllerUpdate } from "../../controllers/users.js";


const user_routes: FastifyPluginAsync = async(fastify) => {
    fastify.get('/users', {schema: UsersSchema}, userControllerGetAllUsers)

    fastify.get<{Body: getUserBody}>("/users/:id", getUserSchema, userControllerGetUser)

    // fastify.get('/users/me', {preHandler: authenticate, schema: UserSchema}, usersControllerGet)

    fastify.put<{Body: UserUpdateBody}>("/users/me", {preHandler: authenticate, schema: UserUpdateSchema}, userControllerUpdate)

    fastify.delete<{Body: UserDeleteBody}>("/users/me", {preHandler: authenticate, schema: UserDeleteSchema}, userControllerDelete)

}

export default user_routes
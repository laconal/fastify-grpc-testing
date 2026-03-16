import type { FastifyInstance, FastifyPluginAsync} from "fastify";
import { RegisterSchema, LoginSchema } from "./shemas.js";
import { auth_register_controller, auth_login_controller } from "../../controllers/auth.js";

export const auth_routers: FastifyPluginAsync = async (fastify: FastifyInstance) => {
    fastify.post("/auth/register", RegisterSchema, auth_register_controller)

    fastify.post("/auth/login", LoginSchema, (req, res) => auth_login_controller(req, res, fastify))
}
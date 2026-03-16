import type { FastifyRequest, FastifyReply } from "fastify";
import type { JwtPayload } from "../routes/auth-router/shemas.js";
import prisma from "../lib/prisma.js";
import { ExceptionsHandler, type CustomError } from "../exceptions/index.js";

export async function authenticate(req: FastifyRequest, res: FastifyReply): Promise<void> {
    try {
        const authHeader = req.headers.authorization
    
        if (!authHeader || !authHeader.startsWith("Bearer ")) { return res.status(401).send({error: "Missing bearer token"}) }
    
        const token = authHeader.split(' ')[1]
        const payload = (await req.jwtVerify()) as JwtPayload;
        const user = await prisma.user.findFirst({
            where: {
                id: payload.id,
                username: payload.username,
                email: payload.email
            }
        })
        if (!user) throw new Error("User not found")
        req.currentUser = user
        req.token = token
        
    } catch (err) { ExceptionsHandler(err as CustomError, req, res) }
}
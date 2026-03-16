Required postgreSQL

fastify-client (grpc client) - **Client**

grpc-server - **Server**


in Client and in Server execute next commands:

*npm install*

*npx prisma migrate dev --schema src/prisma*

specify variables in .env:

DATABASE_URL - path to postgres
gRPC_SERVER_URL - grpc server host and port


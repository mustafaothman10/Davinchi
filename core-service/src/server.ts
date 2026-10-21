
import Fastify from "fastify";

const server = Fastify({
  logger: {
    level: process.env.LOG_LEVEL ?? 'info',
    transport:
      process.env.NODE_ENV !== 'production'
        ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        }
        : undefined,
  },
});

server.get("/", async () => {
  return {
    message: "server is running",
  };
});

server.get("/health", async () => {
  return {
    status: "ok",
  };
});

const start = async () => {
  try {
    await server.listen({
      port: 3000,
      host: "0.0.0.0",
    });

    console.log("Server running on http://localhost:3000");
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

start();

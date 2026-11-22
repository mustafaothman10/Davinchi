
/*
Create and Configure the Fastify Application instance.
*/

import Fastify, { FastifyInstance } from "fastify";

export async function createApp(): Promise<FastifyInstance> {

    const app = Fastify({
        logger: false,// custom logger is used in the project
        requestIdHeader: 'x-request-id',
        requestIdLogLabel: 'requestId',
        disableRequestLogging: true, // We handle logging in our middleware
        trustProxy: true,
        ignoreTrailingSlash: true,
        ajv: {
            customOptions: {
                removeAdditional: 'all',
                coerceTypes: true,
                useDefaults: true,
            },
        },
        schemaController: {
            compilersFactory: {
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return
                buildValidator: () => () => () => true as any,
            },
        },
    });

    // Set custom error handler
    app.setErrorHandler(errorHandler(logger));

    logger.info('Fastify application configured successfully');

    return app;
}


import pino, { Logger } from 'pino';
import { config } from './env';
import { ILogger } from '@davinchi/shared';

/**
 * Pino logger configuration based on environment
 */
const loggerConfig: pino.LoggerOptions = {
  level: config.logLevel,
  ...(config.isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname',
          },
        },
      }
    : {
        formatters: {
          level: (label: string): { level: string } => {
            return { level: label };
          },
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      }),
};

/**
 * Create a base logger instance
 */
export function createLogger(bindings?: Record<string, unknown>): ILogger {
  const pinoLogger: Logger = pino(loggerConfig);

  if (bindings) {
    return createLoggerAdapter(pinoLogger.child(bindings));
  }

  return createLoggerAdapter(pinoLogger);
}

/**
 * Adapter to convert Pino logger to ILogger interface
 */
function createLoggerAdapter(pinoLogger: Logger): ILogger {
  return {
    debug(message: string, context?: Record<string, unknown>): void {
      if (context) {
        pinoLogger.debug(context, message);
      } else {
        pinoLogger.debug(message);
      }
    },

    info(message: string, context?: Record<string, unknown>): void {
      if (context) {
        pinoLogger.info(context, message);
      } else {
        pinoLogger.info(message);
      }
    },

    warn(message: string, context?: Record<string, unknown>): void {
      if (context) {
        pinoLogger.warn(context, message);
      } else {
        pinoLogger.warn(message);
      }
    },

    error(message: string, context?: Record<string, unknown>): void {
      if (context) {
        pinoLogger.error(context, message);
      } else {
        pinoLogger.error(message);
      }
    },
    fatal(message: string, context?: Record<string, unknown>): void {
      if (context) {
        pinoLogger.fatal(context, message);
      } else {
        pinoLogger.fatal(message);
      }
    },

    child(bindings: Record<string, unknown>): ILogger {
      return createLoggerAdapter(pinoLogger.child(bindings));
    },
  };
}

/**
 * Export the main logger instance
 */
export const logger = createLogger();

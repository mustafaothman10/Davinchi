import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();



/**
 * Environment variables validation schema using Zod
 */
const envSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().transform(Number).pipe(z.number().min(1).max(65535)).default(3000),
    POSTGRES_URL: z.string().url().min(1),
    MONGODB_URL: z.string().min(1),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
    ALLOWED_ORIGINS: z
      .string()
      .default('http://localhost:3000')
      .transform((val) => val.split(',').map((origin) => origin.trim())),
    DATABASE_POOL_MIN: z.string().transform(Number).pipe(z.number()).optional(),
    DATABASE_POOL_MAX: z.string().transform(Number).pipe(z.number()).optional(),
    // Public web app URL used in invite emails (set-password link)
    APP_PUBLIC_URL: z
      .string()
      .optional()
      .transform((val) => val?.trim() || undefined)
      .pipe(z.string().url().optional()),
    // Password reset link lifetime, in MINUTES rather than the invite's days: a reset
    // link is issued on demand to anyone who knows an address, and it takes over an
    // existing account rather than creating a new one.
    PASSWORD_RESET_TOKEN_TTL_MINUTES: z
      .string()
      .optional()
      .transform((val) => (val && val.trim() ? Number(val) : 60))
      .pipe(z.number().int().min(5).max(1440)),
    // Kill switch for the reset endpoints. The Password Administrator directory role the
    // feature depends on cannot be un-granted quickly, so closing the feature has to be
    // possible without a deploy.
    //
    // Strict 'true' | 'false', not a truthy transform: this is the switch someone reaches
    // for in a hurry, under pressure, and `PASSWORD_RESET_ENABLED=False` or `=0` must not
    // quietly leave the feature serving. Anything but the two accepted spellings fails
    // the boot with the variable named, which is the safe direction to fail in.
    PASSWORD_RESET_ENABLED: z
      .enum(['true', 'false'])
      .default('true')
      .transform((val) => val === 'true'),
    // Turns off request throttling. Set true by the jest env-setup so integration
    // suites are not limited by their own request volume; the rate-limit tests
    // re-enable it explicitly. Ignored unless NODE_ENV=test — see `config` below.
    RATE_LIMIT_DISABLED: z
      .string()
      .transform((val) => val === 'true')
      .default(false),
    // Test bypass configuration (only works when NODE_ENV=test)
    ALLOW_BYPASS: z
      .string()
      .transform((val) => val === 'true')
      .default(false),
    // Client API Key for external API authentication
    CLIENT_API_KEY: z.string().min(1),
    MAIN_ORGANIZATION_ID: z.string().min(1),
    // Gotenberg PDF Service
    GOTENBERG_URL: z.string().url().min(1),
  });

/**
 * Parse and validate environment variables
 */
function validateEnv(): z.infer<typeof envSchema> {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join('\n');
      throw new Error(`Environment validation failed:\n${missingVars}`);
    }
    throw error;
  }
}

/**
 * Validated environment configuration
 */
const env = validateEnv();

/**
 * Application configuration object
 */
export const config = {
  nodeEnv: env.NODE_ENV,
  port: env.PORT,
  postgresUrl: env.POSTGRES_URL,
  mongodbUrl: env.MONGODB_URL,
  logLevel: env.LOG_LEVEL,
  allowedOrigins: env.ALLOWED_ORIGINS,
  isDevelopment: env.NODE_ENV === 'development',
  isProduction: env.NODE_ENV === 'production',
  isTest: env.NODE_ENV === 'test',
  database: {
    poolMin: env.DATABASE_POOL_MIN,
    poolMax: env.DATABASE_POOL_MAX,
  },

  appPublicUrl: env.APP_PUBLIC_URL ?? 'http://localhost:5173',
  passwordResetTokenTtlMinutes: env.PASSWORD_RESET_TOKEN_TTL_MINUTES,
  passwordResetEnabled: env.PASSWORD_RESET_ENABLED,
  // Allow authentication bypass (only works when NODE_ENV=test)
  allowBypass: env.NODE_ENV === 'test' && env.ALLOW_BYPASS,
  // Gated on NODE_ENV for the same reason as allowBypass: this one switches off every
  // rate limit in the service, so a stray environment variable must not be able to do it
  // in a deployed environment. Outside tests it is always false, whatever is set.
  rateLimitDisabled: env.NODE_ENV === 'test' && env.RATE_LIMIT_DISABLED,
  // Client API Key for external API authentication
  clientApiKey: env.CLIENT_API_KEY,
  mainOrganizationId: env.MAIN_ORGANIZATION_ID,
  // Gotenberg PDF Service
  gotenbergUrl: env.GOTENBERG_URL,
 } as const;

/**
 * Export configuration type
 */
export type Config = typeof config;

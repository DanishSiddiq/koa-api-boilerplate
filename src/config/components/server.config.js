const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    NODE_ENV:     joi.string().allow(['dev', 'prod', 'test']),
    APP_PORT:     joi.number().optional().min(80).max(9000),
    API_VERSION:  joi.string().optional(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Server config validation error: ${error.message}`);
}

const config = {
  server: {
    env:        envVars.NODE_ENV,
    isTest:     envVars.NODE_ENV === 'test',
    isDev:      envVars.NODE_ENV === 'dev',
    isProd:     envVars.NODE_ENV === 'prod',
    port:       envVars.APP_PORT    || 3133,
    apiVersion: envVars.API_VERSION || 'v1',
  },
};

module.exports = config;

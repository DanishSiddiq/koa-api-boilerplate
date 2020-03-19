const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    RABBIT_PORT:        joi.number().optional(),
    RABBIT_HOST:        joi.string().optional(),
    RABBIT_USER_NAME:   joi.string().optional(),
    RABBIT_PASSWORD:    joi.string().optional(),
    RABBITMQ_RECONNECT_TIME: joi.number().optional()
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Queue validation error: ${error.message}`);
}

const config = {
    rabbitMq: {
        port:       envVars.RABBIT_PORT || 5772,
        host:       envVars.RABBIT_HOST || '',
        userName:   envVars.RABBIT_USER_NAME || '',
        password:   envVars.RABBIT_PASSWORD || '',
        vHost:      '/crm',
        reconnectTime: envVars.RABBITMQ_RECONNECT_TIME || 10000,
      },
};

module.exports = config;

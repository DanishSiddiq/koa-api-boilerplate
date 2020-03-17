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
        PORT:       envVars.RABBIT_PORT || 5772,
        Host:       envVars.RABBIT_HOST || '',
        USERNAME:   envVars.RABBIT_USER_NAME || '',
        PASSWORD:   envVars.RABBIT_PASSWORD || '',
        VHOST:      '/crm' 
      },
};

module.exports = config;

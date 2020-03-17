const joi = require('joi');

/**
 * Generate a validation schema using joi to check the type of your environment variables
 */
const envSchema = joi
  .object({
    DB_HOST:  joi.string().required(),
    DB_OPT:   joi.string().required(),
  })
  .unknown()
  .required();

/**
 * Validate the env variables using joi.validate()
 */
const { error, value: envVars } = joi.validate(process.env, envSchema);
if (error) {
  throw new Error(`Database validation error: ${error.message}`);
}

const config = {
  databaseConfig: {
    mongo: {
      DCS: envVars.DB_HOST || 'mongodb://192.168.99.100:37017/dcs',
      OPT: envVars.DB_OPT  || { "poolSize": 5, "native_parser": true, "useNewUrlParser": true, "useUnifiedTopology": true }
    },
  },
};

module.exports = config;

const path        = require('path');
const fs          = require('fs');
const HttpStatus  = require('http-status-codes');
const { logErrDetails }       = require('../../helpers/logger');
const { checkHealthMongoDb }  = require('../../database-connections/db.mongo');

let version = '';

/**
 * read version from bump config
 * @returns {string|string}
 */
const readVersion = () => {
  if (version) {
    return version;
  }

  // Read the version configuration from bumpversion config file
  const versionFilePath = path.join(__dirname, '../../../.bumpversion.cfg');
  const configContent = fs.readFileSync(versionFilePath, 'utf8');

  // extract the `current_version = {}` value form the file
  const configMatches = /current_version\s*?=\s*?(\d+?\.\d+?\.\d+?)/g.exec(configContent);
  if (!configMatches || !configMatches[1]) {
    console.error(`Could not read version from config file ${versionFilePath}`);
  } else {
    version = configMatches[1];
  }

  return version || '0.0.0';
};

/**
 * 
 * @param {*} ctx 
 */
const ping = async ctx => {
  ctx.status = HttpStatus.OK;
  ctx.body   = { ok: 'ok' };
};

/**
 * 
 * @param {*} ctx 
 */
const getVersion = async ctx => {

  ctx.status  = HttpStatus.OK;
  ctx.body    = { version: readVersion() };
};

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const checkHealth = async ctx => {

  let mongoHealth = null;
  let redisHealth = true;
  let errorMessage = '';

  try {
    mongoHealth = await checkHealthMongoDb();
  } catch (error) {
    errorMessage = error.message;
    logErrDetails({ error, message: 'Error Health api: MongoError' });
  }

  try {
    // redisHealth = await redisCheckHealth();
  } catch (error) {
    errorMessage += error.message;
    logErrDetails({ error, message: 'Error Health api: RedisError' });
  }

  if (redisHealth != null && mongoHealth != null) {
    ctx.status  = HttpStatus.OK;
    ctx.body    = {  
      status: HttpStatus.OK,      
      version: readVersion(),      
      mongo: mongoHealth,  
      redis: redisHealth,
    };
  } else {
    logErrDetails({ message: 'Error in health api', additionalData: { redisHealth, mongoHealth } });
    ctx.status  = HttpStatus.SERVICE_UNAVAILABLE;
    ctx.body    = { message: errorMessage };
  }
};

module.exports = {
  ping,
  getVersion,
  checkHealth,
};

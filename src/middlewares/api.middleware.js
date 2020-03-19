const HttpStatus          = require('http-status-codes');
const { logErrDetails }   = require('../helpers/logger');


module.exports = async (ctx, next) => {
  try {    
    await next();
  
  } catch (err) {
    
    // logg error
    logErrDetails( { message: `Error handler in api middleware`, error: err, additionalData: { request: ctx.request }  } );

    ctx.status  = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    ctx.body    = { status: 'failed', message: err.message || 'error' };
  }
};

const { logErrDetails }     = require('../helpers/logger');

module.exports = async (ctx, next) => {
  try {    
    await next();
  
  } catch (err) {
    
    if (err.status >= 500){
      logErrDetails( { message: `Error handler in api middleware`, error: err, additionalData: { request: ctx.request }  } );
    }

    ctx.status = err.status || 500;
    ctx.body = {
      status: 'failed',
      message: err.message || 'error',
    };
  }
};

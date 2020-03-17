const koa           = require('koa');
const bodyParser    = require('koa-bodyparser')();
const compress      = require('koa-compress')();
const cors          = require('@koa/cors')(/* Add your cors option */);
const helmet        = require('koa-helmet')(/* Add your security option */);
const logger        = require('koa-logger')();
const errorHandler  = require('./middlewares/error.middleware');
const serverConfig  = require('./config').server;

// mongodb
const { mongoDbConnect } = require('./database-connections/db.mongo');

// swagger
// const swaggerDocument    = require('./swagger.json');

// routers file
// const routerHealth  = require('./module/health/health.route');
// const routerStudent = require('./module/student/student.route');

// middle-wares
// const ConfigLoaderMiddleware = require('./middlewares/config-loader');
// const RouteNotFoundMiddleware = require('./middlewares/not-found');

// rabbitmq if required producer & listener
// const { initiateRabbitMQ } = require('./queues/connection/rabbitmq');


const app = new koa();

/**
 * Add here only development middlewares
 */
if (!serverConfig.isTest) {
    app.use(logger);
    
    // setup connections
    mongoDbConnect('DCS');
}



// Connect to multiple DB's
if (process.env.NODE_ENV !== 'test') {

 
}

// middlwares and server configurations
app
  .use(errorHandler)
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser);


// app 
//   .use('/', routerHealth)
//   .use('/', ConfigLoaderMiddleware, routerStudent)
//   .use(RouteNotFoundMiddleware) // RouteNotFound middle-wares must

module.exports = app;
const koa           = require('koa');
const bodyParser    = require('koa-bodyparser')();
const compress      = require('koa-compress')();
const cors          = require('@koa/cors')(); // cors
const helmet        = require('koa-helmet')(); // security
const logger        = require('koa-logger')();
const serverConfig  = require('./config').server;

// middle-wares
const middlewareAuthorization = require('./middlewares/authorize.middleware');
const middlewareAPI           = require('./middlewares/api.middleware');

// routers file
const routerUnGuardedHealth   = require('./modules/health/health.unguarded.route');
const routerGuardedEmployee   = require('./modules/employee/employee.guarded.route');
const routerUnGuardedEmployee = require('./modules/employee/employee.unguarded.route');

// mongodb
const { mongoDbConnect } = require('./database-connections/db.mongo');

// swagger
// const swaggerDocument    = require('./swagger.json');

// rabbitmq if required producer & listener
// const { initiateRabbitMQ } = require('./queues/connection/rabbitmq');

const app = new koa();

/**
 * Add here only development middlewares
 */
if (!serverConfig.isTest) {
    app.use(logger);
    
    // setup connections
    mongoDbConnect('flights');
}

// health routes for checking status of application and database connection
routerUnGuardedHealth(app);

// middlwares and server configurations
app.use(middlewareAPI);  // every api processing gateway

// unguarded routes
routerUnGuardedEmployee(app);

// middleware configurations and authorization layer
app
  .use(middlewareAuthorization) // authorization and authentication middles
  .use(helmet)
  .use(compress)
  .use(cors)
  .use(bodyParser);

// guarded routes
routerGuardedEmployee(app);


module.exports = app;
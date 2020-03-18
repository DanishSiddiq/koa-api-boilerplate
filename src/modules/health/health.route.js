const Router = require('koa-router');
const healthController = require('./health.ctrl');


const routerHealth = (app) => {

  const __ = new Router();

  __.get('/api/status', (ctx) => { ctx.body = { status: 'Ok' } });
  __.get('/ping', healthController.ping);
  __.get('/version', healthController.getVersion);
  __.get('/health', healthController.checkHealth);

  app.use(__.routes()).use(__.allowedMethods());
};

module.exports = routerHealth;

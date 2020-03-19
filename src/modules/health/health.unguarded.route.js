const Router = require('koa-router');
const healthController = require('./health.ctrl');


const routerHealth = (app) => {

  const __ = new Router();

  __
  .get('/api/status', (ctx) => { ctx.body = { status: 'Ok' } })
  .get('/ping', healthController.ping)
  .get('/version', healthController.getVersion)
  .get('/health', healthController.checkHealth)

  app.use(__.routes()).use(__.allowedMethods());
};

module.exports = routerHealth;

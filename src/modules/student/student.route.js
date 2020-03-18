const Router        = require('koa-router');
const configServer  = require('../../config').server;
const ctlrStudent   = require('./student.ctrl');


const routerStudent = (app) => {

    const __ = new Router({
        prefix: `/api/${configServer.apiVersion}`    
    });

    __
    .post('/student', ctlrStudent.createOne)
    .get('/student/:_id', ctlrStudent.findOne)
    .put('/student/:_id', ctlrStudent.updateOne)
    .delete('/student/:_id', ctlrStudent.deleteOne);

    app.use(__.routes()).use(__.allowedMethods());
};

module.exports = routerStudent;

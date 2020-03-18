const router        = require('koa-joi-router');
const configServer  = require('../../config').server;
const ctlrStudent   = require('./student.ctrl');


const routerStudent = (app) => {    

    const joi   = router.Joi;
    const __    = router();

    __.prefix(`/api/${configServer.apiVersion}`);
    __.route(
        [
            { // create route
                method: 'post',
                path: '/student',
                validate: {
                    type: 'json',
                    body: joi.object({
                        firstName: joi.string().required(),                
                        lastName: joi.string().required(),                
                        registrationNumber: joi.number().required(),                
                        email: joi.string().email().required(),
                        })
                        .options(                                
                            {                                                
                                abortEarly: false                            
                            }),
                    },
                handler: ctlrStudent.createOne
            },
            { // get route
                method: 'get',
                path: '/student/:_id',
                handler: ctlrStudent.findOne
            },
            { // update route
                method: 'put',
                path: '/student/:_id',
                validate: {
                    query: joi.object({
                        firstName: joi.string().required(),                
                        lastName: joi.string().required(),
                        })
                        .options(
                            {                    
                                abortEarly: false
                            }),
                },
                handler: ctlrStudent.updateOne
            },
            { // delete route
                method: 'delete',
                path: '/student/:_id',
                handler: ctlrStudent.deleteOne
            }       
        ]
    );
    app.use(__.middleware());
};

module.exports = routerStudent;

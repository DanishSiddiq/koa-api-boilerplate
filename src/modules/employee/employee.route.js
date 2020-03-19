const router        = require('koa-joi-router');
const configServer  = require('../../config').server;
const ctlrEmployee   = require('./employee.ctrl');


const routeremployee = (app) => {    

    const joi   = router.Joi;
    const __    = router();

    __.prefix(`/api/${configServer.apiVersion}`);
    __.route(
        [
            { // create route
                method: 'post',
                path: '/employee',
                validate: {
                    type: 'json',
                    body: joi.object({
                        firstName: joi.string().optional(),                
                        lastName: joi.string().optional(),                
                        registrationNumber: joi.number().required(),                
                        email: joi.string().email().required(),
                        password: joi.string().min(3).max(12).required(),
                        passwordVerify: joi.any().valid(joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
                        })
                        .options(                                
                            {                                                
                                abortEarly: false                            
                            }),
                    },
                handler: ctlrEmployee.createOne
            },
            { // get route
                method: 'get',
                path: '/employee',
                handler: ctlrEmployee.findOne
            },
            { // update route
                method: 'put',
                path: '/employee',
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
                handler: ctlrEmployee.updateOne
            },
            { // delete route
                method: 'delete',
                path: '/employee',
                handler: ctlrEmployee.deleteOne
            }       
        ]
    );
    app.use(__.middleware());
};

module.exports = routeremployee;

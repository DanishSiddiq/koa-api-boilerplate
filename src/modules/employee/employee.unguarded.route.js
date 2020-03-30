const router        = require('koa-joi-router');
const configServer  = require('../../config').server;
const ctlrEmployee   = require('./employee.ctrl');


const routerUnGuardedEmployee = (app) => {    

    const joi   = router.Joi;
    const __    = router();

    __.prefix(`/api/${configServer.apiVersion}`);
    __.route(
        [
            { // login
                method: 'post',
                path: '/employee/login',
                validate: {
                    type: 'json',
                    body: joi.object({
                        email: joi.string().email().required(),
                        password: joi.string().min(3).max(12).required(),
                        })
                        .options(                                
                            {                                                
                                abortEarly: false                            
                            }),
                    },
                handler: ctlrEmployee.login
            },
            { // registration
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
            }       
        ]
    );
    app.use(__.middleware());
};

module.exports = routerUnGuardedEmployee;

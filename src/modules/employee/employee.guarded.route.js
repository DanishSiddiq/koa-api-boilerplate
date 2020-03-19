const router        = require('koa-joi-router');
const configServer  = require('../../config').server;
const ctlrEmployee   = require('./employee.ctrl');


const routerGuardedEmployee = (app) => {    

    const joi   = router.Joi;
    const __    = router();

    __.prefix(`/api/${configServer.apiVersion}`);
    __.route(
        [            
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

module.exports = routerGuardedEmployee;

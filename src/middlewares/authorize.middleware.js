const cmn = require('../helpers/common');
const serviceEmployee   = require('../services/employee-service');

module.exports = async (ctx, next) => {

    const authHeader = ctx.get('Authorization');
    const token      = authHeader.split(' ')[1];
    const data       = await cmn.verifyToken(token);
    let employee;

    if(data && data._id){
        employee = await serviceEmployee.findOne({ _id: data._id });
    }

    if(!employee){ 
        throw new Error('User does not exist');
    }

    // to utilize employee information in current pipeline for other middlewares
    ctx.request.employee = employee;

    // proceed
    await next();
};
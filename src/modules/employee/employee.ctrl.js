const HttpStatus        = require('http-status-codes');
const serviceEmployee   = require('../../services/employee-service');
const cmn               = require('../../helpers/common');

/**
 * 
 * @param {*} ctx 
 */
const createOne = async (ctx) => {
    try {
        const document = await serviceEmployee.createOne(ctx.request.body);
        ctx.status     = HttpStatus.CREATED;

        // return jwt
        const token    = await cmn.generateJWTToken({ _id: document._id });
        ctx.body       = { status: 'success', token };

    } catch (e) {
        throw e;
    }
};

/**
 * 
 * @param {*} ctx 
 */
const login = async (ctx) => {
    try {
        let message;
        const data      = ctx.request.body;
        const document  = await serviceEmployee.findOne({ email: data.email });
        if(document){
            const isMatched = await cmn.compareHash(data.password, document.password);            
            if (isMatched) {

                const token   = await cmn.generateJWTToken({ _id: document._id });

                ctx.status    = HttpStatus.OK;
                ctx.body      = { status: 'success', token };
                return;
            }
            else{
                message = 'Credentials does not match';
            }
        } else {
            message = 'User does not exist';
        }

        ctx.status  = HttpStatus.BAD_REQUEST;
        ctx.body    = { status: 'failure', message };

    } catch (e) {
        throw e;
    }
};

/**
 * 
 * @param {*} ctx 
 */
const updateOne = async (ctx) => {
    try {
        const result    = await serviceEmployee.updateOne({ _id: ctx.request.employee._id }, ctx.query);
        ctx.status      = result.nModified ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        ctx.body        = { status: "ok" };

    } catch (e) {
        throw e;
    }
};

/**
 * 
 * @param {*} ctx 
 */
const findOne = async (ctx) => {
    try {
        // although it is possible to return employee from request but it is only for illustration purpose to fetch data from db
        let document      = await serviceEmployee.findOne({ _id: ctx.request.employee._id });
        if(document){
            document.password = undefined;
        }

        ctx.status          = document ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        ctx.body            = document || {};

    } catch (e) {
        throw e;
    }
};

/**
 * 
 * @param {*} ctx 
 */
const deleteOne = async (ctx) => {
    try {
        const result        = await serviceEmployee.deleteOne({ _id: ctx.request.employee._id });
        const isSuccess     = (result.n === 1 && result.ok === 1);

        ctx.status     = isSuccess ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        ctx.body       = { isSuccess };

    } catch (e) {
        throw e;
    }
};

module.exports = { findOne, createOne, updateOne, deleteOne, login };


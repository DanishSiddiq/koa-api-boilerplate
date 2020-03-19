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
const updateOne = async (ctx) => {
    try {
        const result    = await serviceEmployee.updateOne(ctx.params, ctx.query);
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
        const document      = await serviceEmployee.findOne(ctx.params);
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
        const result        = await serviceEmployee.deleteOne(ctx.params);
        const isSuccess     = (result.n === 1 && result.ok === 1);

        ctx.status     = isSuccess ? HttpStatus.OK : HttpStatus.BAD_REQUEST;
        ctx.body       = { isSuccess };

    } catch (e) {
        throw e;
    }
};

module.exports = { findOne, createOne, updateOne, deleteOne };

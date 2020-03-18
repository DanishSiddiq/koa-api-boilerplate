const joi = require('joi');

/**
 * 
 * @param {*} data 
 */
const createOne = async (data) => {
    const schema = joi
    .object({
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        registrationNumber: joi.number().required(),
        email: joi.string().email().required()
    })
    .unknown()
    .required();

    return validate(data, schema);
}

/**
 * 
 * @param {*} data 
 * @param {*} schema 
 */
const validate = async (data, schema) => {
    return joi.validate(data, schema);
}

module.exports = { createOne };

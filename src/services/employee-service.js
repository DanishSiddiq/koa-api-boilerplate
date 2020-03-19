const cmn           = require('../helpers/common');
const modelEmployee  = require('../models/employee-model');
const Repository    = require('../models/data-access/repository');

/**
 *
 * @param data
 * @returns {Promise<document>}
 */
const createOne = async (data) => {
    const repository    = new Repository(modelEmployee);

    // hash password before storing to database
    data.password = await cmn.hash(data.password);
    // delete verify password field
    delete data.passwordVerify;
    return repository.createOne(data);
};

/**
 *
 * @param whereClause
 * @param data
 * @returns {Promise<Query|*>}
 */
const updateOne = async (whereClause, data) => {
    const repository    = new Repository(modelEmployee);
    return repository.updateOne({ ...whereClause, _id: whereClause._id }, data);
};

/**
 *
 * @param whereClause
 * @param projection
 * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>>}
 */
const findOne = async (whereClause, projection = {}) => {
    const repository    = new Repository(modelEmployee);
    return repository.findOne({ ...whereClause, _id: whereClause._id }, projection);
};

/**
 *
 * @param whereClause
 * @returns {Promise<Promise<*>|Query|void|Promise<*|undefined>>}
 */
const deleteOne = async (whereClause) => {
    const repository    = new Repository(modelEmployee);
    return repository.deleteOne({ ...whereClause, _id: whereClause._id });
};

module.exports = { createOne, updateOne, findOne, deleteOne };



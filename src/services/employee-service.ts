import { Employee } from '../models/interface/employee';

const cmn           = require('../helpers/common');
const modelEmployee = require('../models/employee-model');
const Repository    = require('../models/data-access/repository');


/**
 * 
 * @param data 
 */
const createOne = async (data: Employee): Promise<Employee> => {
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
 */
const updateOne = async (whereClause, data: Employee): Promise<Employee> => {
    const repository    = new Repository(modelEmployee);
    return repository.updateOne({ ...whereClause, _id: whereClause._id }, data);
};

/**
 * 
 * @param whereClause 
 * @param projection 
 */
const findOne = async (whereClause, projection = {}): Promise<Employee> => {
    const repository    = new Repository(modelEmployee);
    return repository.findOne({ ...whereClause, ...( whereClause._id && { _id: whereClause._id } ) } , projection);
};

/**
 * 
 * @param whereClause 
 */
const deleteOne = async (whereClause): Promise<Employee> => {
    const repository    = new Repository(modelEmployee);
    return repository.deleteOne({ ...whereClause, _id: whereClause._id });
};

module.exports = { createOne, updateOne, findOne, deleteOne };



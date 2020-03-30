const fs      = require('fs');
const path    = require('path');
const bcrypt  = require('bcrypt');
const jwt  = require('jsonwebtoken');

const configServer = require('../config').server;

const cmn = {

  /**
   * Check if path exists or not
   *
   * @param {string} filePath
   * @returns {boolean}
   */
  isPathExist: (filePath) => {
    return fs.existsSync(path.resolve(__dirname, filePath));
  },

  /**
   * @param arg
   * @returns {boolean}
   */
  isEmpty: (arg) => {
    let val = arg;
    if (typeof val === 'number') {
      val = arg.toString();
    }
    return !val || val === 0 || val.length === 0 || Object.keys(val).length === 0;
  },

  /**
   * error properties are not enumerable, therefore it need to be traversed for stringify operation
   * @param errKey
   * @param errValue
   * @returns {*}
   */
  replaceErrors: (errKey, errValue) => {
    if (errValue instanceof Error) {
      const error = {};
      let keys;

      // get own property name will help in traversing inherited properties
      keys = Object.getOwnPropertyNames(errValue);
      if (keys) {
        for (let i = 0; i < keys.length; i++) {
          error[keys[i]] = errValue[keys[i]];
        }
      }

      // free mem-leak
      keys = null;

      return error;
    }

    return errValue;
  },

  /**
   * usage: __.stringFormat("{0}, {1}", ["Hello", "World"])
   * @param value
   * @param paramsArr
   * @returns {string|void|never}
   */
  stringFormat: (value, paramsArr) => value.replace(/{(\d+)}/g, (match, number) => (typeof paramsArr[number] !== 'undefined' ? paramsArr[number] : match)),


  /**
   * 
   */
  hash: async (data) => {
    const saltRounds = 10;
    
    const hashedPassword = await new Promise((resolve, reject) => { 
      bcrypt.hash(data, saltRounds, function(err, hash) {
        if (err){
          reject(err);
        } 

        resolve(hash);
      });
    });

    return hashedPassword;
  },

  compareHash: async(data, hash) => {

    const hashCompare = await new Promise((resolve, reject) => { 
      bcrypt.compare(data, hash, function(err, res) {

        if(err){
          reject(err);
        }

        resolve(res);
      });
    });

    return hashCompare;
  },

  /**
   * 
   */
  generateJWTToken: async (data) => {
    return jwt.sign(data, configServer.jwtKey, { expiresIn: '1h' });
 },

 /**
  * 
  */
 verifyToken: (jwtToken) => {
   try {
    return jwt.verify(jwtToken, configServer.jwtKey);
   } catch (err){
     throw new Error('Invalid token');
   }
 },

};

module.exports =  cmn;

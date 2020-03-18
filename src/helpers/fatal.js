const { mongoDbDisconnect } = require('../database-connections/db.mongo');

/**
 * 
 */
const handleExit = () => {
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', () => {
    mongoDbDisconnect();
    process.exit(0);
  });

  process.on('exit', () => {
    mongoDbDisconnect();
    process.exit(0);
  });
};

module.exports = {
  handleExit
};


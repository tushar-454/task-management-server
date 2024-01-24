const mongoose = require('mongoose');

const ConnectDB = (connectionStr) => {
  return mongoose.connect(connectionStr);
};

module.exports = ConnectDB;

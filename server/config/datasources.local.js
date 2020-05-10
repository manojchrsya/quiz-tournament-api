const path = require('path');

module.exports = {
  storage: {
    root: path.resolve(__dirname, '../../'),
  },
  mongodb: {
    host: process.env.MONGO_HOST,
  },
};

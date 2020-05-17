const path = require('path');

module.exports = {
  storage: {
    root: path.resolve(__dirname, '../../'),
  },
  mongodb: {
    url: process.env.MONGO_URL,
    lazyConnect: false,
  },
};

require('dotenv').config({ path: '.env' });

module.exports = {
    development: {
      client: 'mysql',
      connection: {
        database: process.env.DB_NAME,
        user:     process.env.DB_USER,
        password: process.env.DB_PASSWORD
      },
      pool: {
        min: 2,
        max: 10
      },
      log: {
        warn(message) {
          console.log("WARN: ", message)
        },
        error(message) {
          console.log("ERROR: ", message)
        },
        deprecate(message) {
          console.log("DEPRECATE: ", message)
        },
        debug(message) {
          console.log("DEBUG: ", message)
        },
      }
    }
  };
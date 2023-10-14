require('dotenv').config();

const db = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      port : process.env.DB_PORT,
      user : process.env.DB_USER,
      database : process.env.DB_DATABASE
    //   password : 'your_database_password',
    }
  });

module.exports = db;
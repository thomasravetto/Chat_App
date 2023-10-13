const db = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'thomasravetto',
      database : 'chat_app'
    //   password : 'your_database_password',
    }
  });

module.exports = db;
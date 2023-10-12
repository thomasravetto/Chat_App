require('dotenv').config();

// Initializing database connection
// To be moved in server.js

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      port : 5432,
      user : 'thomasravetto',
      database : 'chat_app'
    //   password : 'your_database_password',
    }
  });

async function findUserByUsername (email) {
    try {
        const user = await knex('login').where({
            email: email
        }).select('*');

        return user;
    }
    catch (error) {
        return { error: error.message };
    }
}

async function getUserData (email) {
    try {
        const user = await knex('users').where({
            email: email
        }).select('*');

        return user;
    }
    catch (error) {
        return error;
    }
}

module.exports = {
    findUserByUsername,
    getUserData,
}

// TODO: function to query the database for user
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


async function registerUserIntoDatabase (username, email, hash) {
    try {
        return db.transaction(async trx => {
            try {
                const registerEmail = await trx
                    .insert({
                        email:email,
                        hash:hash
                    })
                    .into('login')
                    .returning('email');

                const user = await trx('users')
                    .returning('*')
                    .insert({
                        username: username,
                        email: registerEmail[0].email,
                        joined: new Date()
                    });

                    console.log("data-access",user);

                return user[0];
            } catch (error) {
                throw error;
            }
        });
    } catch {
        return { error: error.message };
    }
}

module.exports = {
    registerUserIntoDatabase
}
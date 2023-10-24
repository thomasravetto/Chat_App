const db = require('../../helpers/db_connection/db');

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

                // await trx.commit();
                return user;

            } catch (error) {
                throw error;
            }
        });
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    registerUserIntoDatabase
}
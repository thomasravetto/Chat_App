const db = require('../../helpers/db_connection/db');

const { getUserData } = require('../login/login.data-access');

async function registerGoogleUserIntoDatabase (username, email, done) {
    const trx = await db.transaction();
    try {
        const existingUser = await getUserData(email);

        console.log(existingUser, email)

        if (existingUser.length > 0) {
            await trx.commit();
            return done(null, existingUser[0]);
        } else {
                const user = await trx('users')
                .insert({
                    username: username,
                    email:email,
                    joined: new Date()
                })
                .returning('*');

            console.log('google user', user);

            await trx.commit();
            return done(null, user[0]);
        }
    } catch (error) {
        await trx.rollback();
        return done(error);
    }
}

module.exports = {
    registerGoogleUserIntoDatabase
}
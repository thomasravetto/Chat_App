const db = require('../../helpers/db_connection/db');

async function findUserInDatabase (username) {
    try {
        const usersData = await db('users').whereILike('username', `%${username}%`);

        return usersData
    } catch (error) {
        return { error };
    }
}

module.exports = {
    findUserInDatabase,
}
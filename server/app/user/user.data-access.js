const db = require('../../helpers/db_connection/db');

async function findUserInDatabase (username) {
    try {
        const usersData = await db('users').whereILike('username', `${username}%`);

        return usersData
    } catch (error) {
        return { error };
    }
}

async function getUserDataFromDatabase (username) {
    try {
        const userData = await db('users').where('username', `${username}`);

        return userData;
    } catch (error) {
        return { error };
    }
}

async function getFriendshipData (viewerUserId, profileUserId) {
    try {
        const friendshipData = await db('friendships').where({
            senderid: viewerUserId,
            receiverid: profileUserId
        }).orWhere({
            senderid: profileUserId,
            receiverid: viewerUserId
        });
        return friendshipData;
    } catch (error) {
        return { error };
    }
}

module.exports = {
    findUserInDatabase,
    getUserDataFromDatabase,
    getFriendshipData
}
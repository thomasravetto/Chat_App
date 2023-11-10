const db = require('../../helpers/db_connection/db');

const { getUserDataFromDatabase } = require('../user/user.data-access');

async function getFriendsOfUserIdFromDatabase(userId) {
    try {
        const friendshipsData = await returnFriendshipsOfUserId(userId);

        const friendsIds = friendshipsData.map((friendship) => {
            return (friendship.senderid === userId ? friendship.receiverid : friendship.senderid);
        });

        const friendsList = await getUserDataFromDatabase(friendsIds);

        return friendsList;
    } catch (error) {
        return { error };
    }
}


async function returnFriendshipsOfUserId (userId) {
    try {
        const friendsList = await db('friendships')
        .select(['id', 'senderid', 'receiverid'])
        .where({
            senderid: userId,
            pending: false,
            accepted: true
        }).orWhere({
            receiverid: userId,
            pending: false,
            accepted: true
        });

        return friendsList;
    } catch (error) {
        return { error };
    }
}

module.exports = {
    getFriendsOfUserIdFromDatabase,
}
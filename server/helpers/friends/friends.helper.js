const { getFriendsOfUserIdFromDatabase } = require('../../app/friends/friends.data-access');

async function getFriendsOfUserIdHelper (userId) {
    try {
        const friendsList = await getFriendsOfUserIdFromDatabase(userId);

        return friendsList;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    getFriendsOfUserIdHelper,
}
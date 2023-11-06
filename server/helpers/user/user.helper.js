const { findUserInDatabase, getUserDataFromDatabase, getFriendshipData, sendFriendshipRequestInDatabase } = require('../../app/user/user.data-access');

async function findUserHelper (username) {
    const usersData = await findUserInDatabase(username);

    if (usersData.length !== 0) {
        return { users: usersData };
    } else {
        return { error: 'No user was found'};
    }
}

async function getUserInfoHelper (id) {
    const userData = await getUserDataFromDatabase(id);

    if (userData) {
        return userData[0];
    } else {
        return { error: 'No user was found' };
    }
}

async function checkFriendshipHelper (viewerUserId, profileUserId) {
    const friendshipData = await getFriendshipData(viewerUserId, profileUserId);

    if (friendshipData.length !== 0) {
        return friendshipData[0];
    } else {
        return { error: 'No friendship was found in db' };
    }
}

async function sendFriendshipRequestHelper (senderUserId, receiverUserId) {
    const friendshipRequest = await sendFriendshipRequestInDatabase(senderUserId, receiverUserId);

    if (friendshipRequest.length !== 0 && !friendshipRequest.error) {
        return friendshipRequest[0];
    } else {
        return { error: 'Error while sending the request' };
    }
}

module.exports = {
    findUserHelper,
    getUserInfoHelper,
    checkFriendshipHelper,
    sendFriendshipRequestHelper
}
const db = require('../../helpers/db_connection/db');

async function findUserInDatabase (username) {
    try {
        const usersData = await db('users').whereILike('username', `${username}%`);

        return usersData
    } catch (error) {
        return { error };
    }
}

async function getUserDataFromDatabase (id) {
    try {
        const userData = await db('users').where('id', `${id}`);

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

async function sendFriendshipRequestInDatabase (senderUserId, receiverUserId) {
    const trx = await db.transaction();

    if (senderUserId === receiverUserId) {
        return { error: 'Invalid request'};
    }
    try {
        const friendshipAlreadyExists = await getFriendshipData(senderUserId, receiverUserId);

        if (friendshipAlreadyExists.length === 0) {
            const friendshipRequest = await trx('friendships')
            .insert({
                senderid: senderUserId,
                receiverid: receiverUserId,
                pending: true,
                accepted: false
            })
            .returning('*');

            await trx.commit();
            return friendshipRequest;
        } else {
            return { error: 'Friendship already exists in database'}
        }
    } catch (error) {
        return { error };
    }
}

async function handleIncomingRequestsInDatabase (senderUserId, receiverUserId, requestStatus) {
    try {
        const friendshipStatus = await db('friendships')
        .where({
            senderid: senderUserId,
            receiverid: receiverUserId,
            pending: true
        })
        .orWhere({
            senderid: receiverUserId,
            receiverid: senderUserId,
            pending: true
        })
        .update({
            pending: false,
            accepted: requestStatus
        });

        return friendshipStatus;
    } catch (error) {
        return { error };
    }
}

module.exports = {
    findUserInDatabase,
    getUserDataFromDatabase,
    getFriendshipData,
    sendFriendshipRequestInDatabase,
    handleIncomingRequestsInDatabase
}
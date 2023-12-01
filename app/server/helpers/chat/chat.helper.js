const { getChatForUsersIdsFromDatabase, createChatForUsersIdsFromDatabase } = require('../../app/chat/chat.data-access');

async function getChatForUsersIdsHelper (userId, friendId) {
    try {
        const chatData = await getChatForUsersIdsFromDatabase(userId, friendId);

        if (chatData.length !== 0) {
            return chatData[0];
        } else {
            return { error: 'No chat was found' };
        }
    } catch (error) {
        return { error: error.message };
    }
}

async function createChatForUsersIdsHelper (userId, friendId) {
    try {
        const newChatData = await createChatForUsersIdsFromDatabase(userId, friendId);

        if (newChatData.length !== 0) {
            return newChatData[0];
        } else {
            return { error: 'Error creating chat' };
        }

    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    getChatForUsersIdsHelper,
    createChatForUsersIdsHelper
}
const db = require('../../helpers/db_connection/db');

async function getChatForUsersIdsFromDatabase (userId, friendId) {
    try {
        const chatData = await db('chats')
            .join('chatparticipants as cp1', 'chats.id', '=', 'cp1.chatid')
            .join('chatparticipants as cp2', 'chats.id', '=', 'cp2.chatid')
            .where('cp1.userid', userId)
            .where('cp2.userid', friendId)
            .select('chats.id', 'chats.created');

        console.log('chat found');
        return chatData;
    } catch (error) {
        return { error: error.message };
    }
}

async function createChatForUsersIdsFromDatabase (userId, friendId) {
    try {
        const newChatData = await db('chats').insert({ created: new Date() }).returning('id');

        // Add both users as participants in the chat
        await db('chatparticipants').insert([
            { chatid: newChatData[0].id, userid: userId },
            { chatid: newChatData[0].id, userid: friendId }
        ]);

        console.log('chat created');
        return newChatData;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = {
    getChatForUsersIdsFromDatabase,
    createChatForUsersIdsFromDatabase
}
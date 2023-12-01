const db = require('../../helpers/db_connection/db');

async function loadMessagesFromDatabase (chatId) {
    try {
        const messagesData = await db('messages')
        .where('chatid', `${chatId}`);

        return messagesData;
    } catch (error) {
        return { error };
    }
}

async function sendMessageInDatabase (chatId, senderId, content) {
    try {
        const newMessage = await db('messages').insert({
            chatid: chatId,
            senderid: senderId,
            content: content
        }).returning("*");

        return newMessage;
    } catch (error) {
        return { error };
    }
}

module.exports = {
    loadMessagesFromDatabase,
    sendMessageInDatabase
}
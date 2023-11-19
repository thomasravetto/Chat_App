const { loadMessagesFromDatabase, sendMessageInDatabase } = require('../../app/messages/messages.data-access');

async function loadMessagesHelper (chatId) {
    const messagesData = await loadMessagesFromDatabase(chatId);

    if (messagesData.length !== 0) {
        return messagesData;
    } else {
        return { error: 'No messages were found' };
    }
}

async function sendMessageHelper (chatId, senderId, content) {
    const messageSent = await sendMessageInDatabase(chatId, senderId, content);

    if (messageSent.length !== 0) {
        return messageSent[0];
    } else {
        return { error: 'Message was not sent' };
    }
}

module.exports = {
    loadMessagesHelper,
    sendMessageHelper
}
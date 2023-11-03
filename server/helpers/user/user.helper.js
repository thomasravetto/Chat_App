const { findUserInDatabase, getUserDataFromDatabase } = require('../../app/user/user.data-access');

async function findUserHelper (username) {
    const usersData = await findUserInDatabase(username);

    if (usersData.length !== 0) {
        return { users: usersData };
    } else {
        return { error: 'No user was found'};
    }
}

async function getUserInfoHelper (username) {
    const userData = await getUserDataFromDatabase(username);

    if (userData) {
        return userData[0];
    } else {
        return {error: 'No user was found'};
    }
}

module.exports = {
    findUserHelper,
    getUserInfoHelper
}
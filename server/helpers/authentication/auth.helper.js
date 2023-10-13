const bcrypt = require('bcrypt');
const { findUserByUsername, getUserData } = require('../../app/login/login.data-access');


// Function to log in user
async function handleLogin (email, password) {
    try {
        const userData = await findUserByUsername(email);

        if (userData.length === 0) {
            return { error: 'User not found' };
        };

        const isValid = await isPasswordValid(password, userData[0].hash);

        if (isValid) {
            const user = await getUserData(email);
            return user;
        } else {
            return { error: "Invalid Password" };
        }
    } catch (error) {
        return { error: error.message };
    }
}

async function isPasswordValid (password, hash) {
    return await bcrypt.compare(password, hash);
}

module.exports = {
    handleLogin,
}
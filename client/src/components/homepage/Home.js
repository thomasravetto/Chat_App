import { useEffect, useState } from 'react';
import NavBar from '../navbar/NavBar';
import FriendsList from './FriendsList';
import ChatView from './ChatView';

function Home (props) {

    const API_URL = 'https://localhost:3500/v1';

    const [userId, setUserId] = useState(props.userId); // change to props.userId
    const [username, setUsername] = useState(props.username); // change to props.username
    const [email, setEmail] = useState(props.email);
    const [friendsList, setFriendsList] = useState(
        [
            {
                "id": 18,
                "username": "sara",
                "email": "sara@gmail.com",
                "joined": "2023-11-07T11:17:08.686Z"
            },
            {
                "id": 19,
                "username": "Thomas Ravetto",
                "email": "travetto18@gmail.com",
                "joined": "2023-11-07T12:36:03.114Z"
            },
            {
                "id": 22,
                "username": "saretta",
                "email": "ferrarisara@gmail.com",
                "joined": "2023-11-09T11:53:11.177Z"
            }
        ]); // change back to null
    const [openedChatId, setOpenedChatId] = useState();

    async function populateFriendsList (userId) {
        const resp = await fetch(API_URL + '/friends/get_friends', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
            })
        });
        const data = await resp.json();

        const friendsList = data.map((user) => ({
            id: user.id,
            username: user.username
        }));

        setFriendsList(friendsList);
    }

    async function loadChat(userId, friendId) {
        const resp = await fetch(API_URL + '/chat/get_chat', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: userId,
                friendId, friendId,
            })
        });

        const chatData = await resp.json();


        if (chatData.id) {
            setOpenedChatId(chatData.id);
        } else if (chatData.error === 'No chat was found') {

            const resp = await fetch(API_URL + '/chat/create_chat', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    userId: userId,
                    friendId: friendId
                })
            });

            const newChatData = await resp.json();

            if (newChatData.id) {
                setOpenedChatId(newChatData.id);
            } else if (newChatData.error) {
                console.error(newChatData);
            }

        } else {
            console.error('error while fetching chat');
        }
    }

    // useEffect(() => {
    //     populateFriendsList(userId);
    // }, [userId]);

    return (
        <div>
            <NavBar username={username} userId={userId}/>
            <div className='chat_and_friends_container'>
                <FriendsList userId={userId} friendsList={friendsList} loadChat={loadChat}/>
                <ChatView openedChatId={openedChatId} userId={userId} io={props.io}/>
            </div>
        </div>
    )
}

export default Home;
import { useEffect, useState } from 'react';
import NavBar from '../navbar/NavBar';
import FriendsList from './FriendsList';
import ChatView from './ChatView';
import Loader from '../loader/Loader';

function Home (props) {

    const API_URL = props.API_URL;

    const [userId, setUserId] = useState(props.userId); // change to props.userId
    const [username, setUsername] = useState(props.username); // change to props.username
    const [email, setEmail] = useState(props.email);
    const [friendsList, setFriendsList] = useState([]); // change back to null
    const [openedChatId, setOpenedChatId] = useState();

    const [isLoading, setIsLoading] = useState(true);

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
            return friendId;
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
                return friendId;
            } else if (newChatData.error) {
                console.error(newChatData);
            }

        } else {
            console.error('error while fetching chat');
        }
    }

    useEffect(() => {
        async function fetchData () {
            await populateFriendsList(userId);
            setIsLoading(false);
        }

        fetchData();
    }, [userId]);

    return (
        <div>
            {isLoading
            ? <Loader/>
            : <div>
                <NavBar username={username} userId={userId} API_URL={API_URL}/>
                <div className='chat_and_friends_container'>
                    <FriendsList userId={userId} friendsList={friendsList} loadChat={loadChat}/>
                    <ChatView openedChatId={openedChatId} userId={userId} io={props.io} API_URL={API_URL}/>
                </div>
             </div>}
        </div>
    )
}

export default Home;
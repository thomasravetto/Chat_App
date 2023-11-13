import { useEffect, useState } from 'react';
import NavBar from '../navbar/NavBar';
import FriendsList from './FriendsList';
import ChatView from './ChatView';

function Home (props) {

    const API_URL = 'https://localhost:3500/v1';

    const [userId, setUserId] = useState(props.userId); // change to props.userId
    const [username, setUsername] = useState(props.username); // change to props.username
    const [email, setEmail] = useState(props.email);
    const [friendsList, setFriendsList] = useState(); // change back to null

    async function populateFriendsList (username) {
        const resp = await fetch(API_URL + '/friends/get_friends', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: userId,
            })
        });
        const data = await resp.json();

        console.log(data);

        const friendsList = data.map((user) => ({
            id: user.id,
            username: user.username
        }));

        setFriendsList(friendsList);
    }

    useEffect(() => {
        populateFriendsList(username);
    }, [userId]);

    return (
        <div>
            <NavBar username={username}/>
            <div className='chat_and_friends_container'>
                <FriendsList friendsList={friendsList}/>
                <ChatView chatView={''}/>
            </div>
        </div>
    )
}

export default Home;
import { useEffect, useState } from 'react';
import NavBar from '../navbar/NavBar';
import FriendsList from './FriendsList';

function Home (props) {

    const API_URL = 'https://localhost:3500/v1';

    const [userId, setUserId] = useState(props.userId);
    const [username, setUsername] = useState(props.username);
    const [email, setEmail] = useState(props.email);
    const [friendsList, setFriendsList] = useState();

    async function populateFriendsList (username) {
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

    useEffect(() => {
        populateFriendsList(username);
    }, [userId]);

    return (
        <div>
            <NavBar username={username}/>
            <FriendsList friendsList={friendsList}/>
        </div>
    )
}

export default Home;
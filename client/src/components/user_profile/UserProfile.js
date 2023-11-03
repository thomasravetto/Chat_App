import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const API_URL = 'https://localhost:3500/v1';

function UserProfile (props) {

    const [isFriend, setIsFriend] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [joined, setJoined] = useState('ogggi');
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const username = params.get('username');

    async function GetUserData (username) {
        const resp = await fetch(API_URL + '/user/get_user_data', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
            }),
        });

        const { joined } = await resp.json();
        setJoined(joined);
        return;
    }

    GetUserData(username);

    return (
        <div className="profile_page">
            <div className="user_name_image">{username[0].toUpperCase()}</div>
            <h2>Username: {username}</h2>
            <p>Joined on: {joined}</p>
            {isFriend
                ? isChatOpen
                    ? <button>Open Chat</button>
                    : <button>Start New Chat</button>
                : <button>Send Friend request</button>}
        </div>
    )
}

export default UserProfile;
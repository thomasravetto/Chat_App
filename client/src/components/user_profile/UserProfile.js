import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const API_URL = 'https://localhost:3500/v1';

function UserProfile (props) {

    const [isFriend, setIsFriend] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [profileJoined, setJoined] = useState('');
    const [profileUsername, setUsername] = useState('');

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const profileId = Number(params.get('id'));

    async function GetUserData (id) {
        const resp = await fetch(API_URL + '/user/get_user_data', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
            }),
        });

        const { username, joined } = await resp.json();
        setUsername(username);
        setJoined(joined);
        return;
    }

    async function checkUserFriendship (viewerUserId, profileUserId) {
        const resp = await fetch(API_URL + '/user/check_friendship', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                viewerUserId: viewerUserId,
                profileUserId: profileUserId,
            }),
        });

        const data = await resp.json();

        if (!data.pending && data.accepted) {
            setIsFriend(true);
        }
    }

    const viewerId = props.id;

    useEffect(() => {
        GetUserData(profileId);
        checkUserFriendship(viewerId, profileId);
    }, [profileId, viewerId]);

    return (
        <div className="profile_page">
            <div className="user_name_image">{profileUsername && profileUsername[0] && profileUsername[0].toUpperCase()}</div>
            <h2>Username: { profileUsername }</h2>
            <p>Joined on: { profileJoined }</p>
            {isFriend
                ? isChatOpen
                    ? <button>Open Chat</button>
                    : <button>Start New Chat</button>
                : <button>Send Friend request</button>}
        </div>
    )
}

export default UserProfile;
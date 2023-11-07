import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const API_URL = 'https://localhost:3500/v1';

function UserProfile (props) {

    // Friend requests
    const [isFriend, setIsFriend] = useState(false);
    const [isRequestPending, setPendingRequest] = useState(false);
    const [isIncomingRequest, setIncomingRequest] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);

    // Profile
    const [profileJoined, setJoined] = useState('');
    const [profileUsername, setUsername] = useState('');

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const profileId = Number(params.get('id'));

    const viewerId = props.id;

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
        } else if (data.pending && data.senderid === viewerUserId) {
            setPendingRequest(true);
        } else if (data.pending && data.receiverid === viewerUserId) {
            setPendingRequest(true);
            setIncomingRequest(true);
        }
    }

    async function sendFriendRequest (senderUserId, receiverUserId) {
        const resp = await fetch(API_URL + '/user/send_friendship_request', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                senderUserId: senderUserId,
                receiverUserId: receiverUserId,
            }),
        });

        const data = await resp.json();

        console.log(data);

        if (data.id) {
            setPendingRequest(true);
        }
    }

    async function handleFriendRequest (senderUserId, receiverUserId, requestStatus) {
        const resp = await fetch(API_URL + '/user/handle_friendship_request', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
                senderUserId: senderUserId,
                receiverUserId: receiverUserId,
                requestStatus: requestStatus
            }),
        });

        const data = await resp.json();

        if (data) {
            setIsFriend(true);
        }
    }

    useEffect(() => {
        GetUserData(profileId);
        checkUserFriendship(viewerId, profileId);
    }, [profileId, viewerId]);

    useEffect(() => {
        console.log(isRequestPending, isIncomingRequest);
    }, [isRequestPending, isIncomingRequest]);

    return (
        <div className="profile_page">
            <div className="user_name_image">{profileUsername && profileUsername[0] && profileUsername[0].toUpperCase()}</div>
            <h2><small style={{fontWeight: 'lighter'}}>Username:</small> { profileUsername }</h2>
            <p>Joined on: { profileJoined }</p>
            {isFriend
                ? isChatOpen
                    ? <button>Open Chat</button>
                    : <button>Start New Chat</button>
                : isRequestPending
                    ? isIncomingRequest
                        ? <div className="incoming_request_container">
                            <p className="incoming_request_message">Accept <b>{ profileUsername }</b> friend request:</p>
                            <button className="accept_button" onClick={() => handleFriendRequest(viewerId, profileId, true)}>&#10003;</button>
                            <button className="refuse_button" onClick={() => handleFriendRequest(viewerId, profileId, false)}>&#10005;</button>
                          </div>
                        : <button>Pending</button>
                    : <button onClick={() => sendFriendRequest(viewerId, profileId)}>Send Friend request</button>}
        </div>
    )
}

export default UserProfile;
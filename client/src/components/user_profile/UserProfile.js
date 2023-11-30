import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProfileLoader from './ProfileLoader';

function UserProfile (props) {

    const API_URL = props.API_URL;

    // Friend requests
    const [isFriend, setIsFriend] = useState(false);
    const [isRequestPending, setPendingRequest] = useState(false);
    const [isIncomingRequest, setIncomingRequest] = useState(false);

    const [isLoading, setIsLoading] = useState(true);

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

    function formattedDate (dateToFormat) {
        const date = new Date(dateToFormat);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear();

        // Ensure leading zero for day and month if they are single digits
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        return `${formattedDay}-${formattedMonth}-${year}`;
      };

    useEffect(() => {
        async function fetchData () {
            await GetUserData(profileId);
            await checkUserFriendship(viewerId, profileId);
            setIsLoading(false);
          }

          fetchData();
    }, [profileId, viewerId]);

    return (
        <div className="profile_page">
          {isLoading ? (
            <ProfileLoader />
          ) : (
            <div>
              <div className="username_and_image_container">
                <div className="user_name_image">
                  {profileUsername && profileUsername[0] && profileUsername[0].toUpperCase()}
                </div>
                <h2 className="user_name_name">
                  <small style={{ fontWeight: 'lighter' }}>Username:</small> {profileUsername}
                </h2>
              </div>
              <p className="user_joined">Joined on: {formattedDate(profileJoined)}</p>
              {isFriend ? (
                <div className="friends_badge">Friends 🤝</div>
              ) : isRequestPending ? (
                isIncomingRequest ? (
                  <div className="incoming_request_container">
                    <p className="incoming_request_message">
                      Accept <b>{profileUsername}</b> friend request:
                    </p>
                    <div className="button_container">
                      <button
                        className="accept_button"
                        onClick={() => handleFriendRequest(viewerId, profileId, true)}
                      >
                        &#10003;
                      </button>
                      <button
                        className="refuse_button"
                        onClick={() => handleFriendRequest(viewerId, profileId, false)}
                      >
                        &#10005;
                      </button>
                    </div>
                  </div>
                ) : (
                  <button className="pending_button">Pending</button>
                )
              ) : (
                <button
                  className="send_req_button"
                  onClick={() => sendFriendRequest(viewerId, profileId)}
                >
                  Send Friend request
                </button>
              )}
            </div>
          )}
        </div>
      );
}

export default UserProfile;
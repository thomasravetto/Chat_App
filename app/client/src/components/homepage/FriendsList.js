import { useEffect, useState } from "react";

function FriendsList (props) {

    const [openedChatUserId, setOpenedChatUserId] = useState();

    async function fetchChatData (userId, friendId) {
        const chatUserId = await props.loadChat(userId, friendId);
        setOpenedChatUserId(chatUserId);
    };

    useEffect(() => {
        return () => {
            setOpenedChatUserId(null);
        }
    }, []);

    return (
        <div className="friends_external_container">
            <div className="friends_container">
                {props.friendsList && props.friendsList.map((friend) => (
                    <a onClick={() => fetchChatData(props.userId, friend.id)}
                     style={{
                        backgroundColor: ( openedChatUserId === friend.id ) ? '#e2e2e2' : '',
                     }}
                     className="friend_view"
                     key={friend.id}>
                        <div className="friend_image">{friend.username[0].toUpperCase()}</div>
                        <div className="friend_username">{friend.username}</div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default FriendsList;
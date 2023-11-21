function FriendsList (props) {

    return (
        <div className="friends_external_container">
            <div className="friends_container">
                {props.friendsList && props.friendsList.map((friend) => (
                    <a onClick={() => props.loadChat(props.userId, friend.id)} className="friend_view" key={friend.id}><div className="friend_image">{friend.username[0].toUpperCase()}</div><div className="friend_username">{friend.username}</div></a>
                ))}
            </div>
        </div>
    )
}

export default FriendsList;
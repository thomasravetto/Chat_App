function FriendsList (props) {

    return (
        <div className="friends_container">
            {props.friendsList && props.friendsList.map((friend) => (
                <a onClick={() => props.loadChat(props.userId, friend.id)} className="friend_view" key={friend.id}><div className="friend_image">{friend.username[0].toUpperCase()}</div>{friend.username}</a>
            ))}
        </div>
    )
}

export default FriendsList;
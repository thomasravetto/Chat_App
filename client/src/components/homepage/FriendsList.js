function FriendsList (props) {

    return (
        <div className="friends_container">
            {props.friendsList && props.friendsList.map((user) => (
                <a className="friend_view" key={user.id}><div className="friend_image">{user.username[0].toUpperCase()}</div>{user.username}</a>
            ))}
        </div>
    )
}

export default FriendsList;
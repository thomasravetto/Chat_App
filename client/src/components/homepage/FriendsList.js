function FriendsList (props) {

    return (
        <div>
            Friends: {props.friendsList && props.friendsList.map((user) => (
                <div key={user.id}>{user.username}</div>
            ))}
        </div>
    )
}

export default FriendsList;
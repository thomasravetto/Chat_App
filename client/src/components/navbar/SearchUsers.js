function SearchUsers (props) {
    return (
        <div className="searchbox_container">
            {props.foundUsers &&
                (Array.isArray(props.foundUsers) && props.foundUsers.length > 0
                    ? props.foundUsers.map((user) => (
                        <a className="user" href={`/profile?username=${user.username}`} key={user.id}>{user.username}</a>
                    ))
                    : <p className="user_not_found">No users were found</p>
                )
            }
        </div>
    );
}

export default SearchUsers;
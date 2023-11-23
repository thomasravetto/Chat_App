function SearchUsers (props) {

    return (
        <div className="searchbox_container">
            {props.foundUsers &&
                (Array.isArray(props.foundUsers) && props.foundUsers.length > 0
                    ? props.foundUsers.map((user) => (
                        props.username !== user.username
                            ? <a className="searchbox_user" href={`/profile?id=${user.id}`} key={user.id}>
                                <div className="searchbox_user_image">{user.username && user.username[0] && user.username[0].toUpperCase()}</div>
                                <div className="searchbox_user_name">{user.username}</div>
                              </a>
                            : <div></div>
                    ))
                    : <p className="user_not_found">No users were found</p>
                )
            }
        </div>
    );
}

export default SearchUsers;
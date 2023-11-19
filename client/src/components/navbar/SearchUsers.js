function SearchUsers (props) {
    return (
        <div className="searchbox_container">
            {props.foundUsers &&
                (Array.isArray(props.foundUsers) && props.foundUsers.length > 0
                    ? props.foundUsers.map((user) => (
                        <a className="user" href={`/profile?id=${user.id}`} key={user.id}><div>{user.username && user.username[0] && user.username[0].toUpperCase()}</div>  {user.username}</a>
                    ))
                    : <p className="user_not_found">No users were found</p>
                )
            }
        </div>
    );
}

export default SearchUsers;
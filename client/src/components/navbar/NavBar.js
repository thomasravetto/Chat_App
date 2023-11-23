import { useState } from 'react';
import appLogo from '../../logo_definitivo.png';
import SearchUsers from './SearchUsers';
import Notifications from './Notifications';

const API_URL = 'https://localhost:3500/v1';
let timer;

function NavBar (props) {

    const [foundUsers, setFoundUsers] = useState();

    async function findUserByUsername (username) {
        if (username === '') {
            setFoundUsers('');
            return;
        }

        let usersList;
        const resp = await fetch(API_URL + '/user/search_user',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username: username
            }),
        });
        const data = await resp.json();

        if (!data.error) {
            let usersList = data.usersList;
            setFoundUsers(usersList);
        } else {
            setFoundUsers({error: ['No user was found']});
        }
    }

    function onInputChange (event) {
        const inputText = event.target.value;
        const waitTime = 1000;

        clearTimeout(timer);

        timer = setTimeout(() => {
            findUserByUsername(inputText);
        }, waitTime);
    }

    return (
        <div className='navbar_container'>
            <a href={'/authentication'} className="navbar_image">{props.username && props.username[0] && props.username[0].toUpperCase()}</a>
            <input type='text'className='search_user_input' placeholder='Find New Friends' onChange={onInputChange} onBlur={(event) => { event.target.value = ''; onInputChange(event);}}></input>
            <img className='logo_image' src={appLogo} alt='Logo'></img>
            <Notifications userId={props.userId}/>
            <SearchUsers foundUsers={foundUsers} username={props.username}/>
        </div>
    )
}

export default NavBar;
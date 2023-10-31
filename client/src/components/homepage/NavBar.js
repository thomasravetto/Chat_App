import { useState } from 'react';
import appLogo from '../../logo_chat_app.png';

const API_URL = 'https://localhost:3500/v1';
let timer;

function NavBar (props) {

    const [foundUsers, setFoundUsers] = useState('');

    async function findUserByUsername (username) {
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
            let usersList = data.usersList.map((user) => user.username)
            setFoundUsers(usersList);
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
            <input type='text'className='search_user_input' placeholder='Find New Friends' onChange={onInputChange}></input>
            <img className='logo_image' src={appLogo} alt='Logo'></img>
            <p>{props.username}</p>
            <p>{foundUsers}</p>
        </div>
    )
}

export default NavBar;
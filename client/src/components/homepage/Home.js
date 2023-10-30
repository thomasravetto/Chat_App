import { useState } from 'react';
import appLogo from '../../logo_chat_app.png';

function Home (props) {

    const [username, setUsername] = useState(props.username);
    const [email, setEmail] = useState(props.email);

    return (
        <div className='navbar_container'>
            <img className='logo_image' src={appLogo} alt='Logo'></img>
        </div>
    )
}

export default Home;
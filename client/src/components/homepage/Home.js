import { useState } from 'react';
import NavBar from './NavBar';

function Home (props) {

    const [username, setUsername] = useState(props.username);
    const [email, setEmail] = useState(props.email);

    return (
        <NavBar username={username}/>
    )
}

export default Home;
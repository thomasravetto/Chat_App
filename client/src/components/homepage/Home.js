import { useState } from 'react';
import NavBar from '../navbar/NavBar';

function Home (props) {

    const [username, setUsername] = useState(props.username);
    const [email, setEmail] = useState(props.email);

    return (
        <NavBar username={username}/>
    )
}

export default Home;
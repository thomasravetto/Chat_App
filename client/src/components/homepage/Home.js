import { useState } from 'react';

function Home (props) {

    return (
        <div>{props.username} {props.email}</div>
    )
}

export default Home;
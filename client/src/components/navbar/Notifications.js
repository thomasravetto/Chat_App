import { useEffect, useState } from "react";
import BellLogo from '../../bell_image.png';

const API_URL = 'https://localhost:3500/v1';

function Notifications (props) {

    const [requestsUsernames, setUsernames] = useState([]);
    const [requestsIds, setIds] = useState([]);

    async function getIncomingRequests (userId) {
        const resp = await fetch(API_URL + '/user/get_incoming_requests', {
            method: 'post',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: userId,
            })
        });

        const data = await resp.json();

        const requestsUsernames = data.map((request) => request.username);
        setUsernames(requestsUsernames);

        const requestsIds = data.map((request) => request.id);
        setIds(requestsIds);
    }

    // useEffect(() => {
    //     getIncomingRequests(props.userId)
    // }, [props.userId]);

    return (
        <div className="bell_container">
            <img className="bell_notification_image" src={BellLogo} alt="bell notification logo"></img>
            {requestsUsernames.length !== 0
                ? <div className="notifications_number">{requestsUsernames.length}</div>
                : <div></div>}
            <div className="requests_container">
                {requestsUsernames && requestsUsernames.map((user, index) => (
                    <a className="notification_user" href={`/profile?id=${requestsIds[index]}`} key={requestsIds[index]}><div className="notification_user_image">{user && user[0] && user[0].toUpperCase()}</div> {user}</a>
                ))}
            </div>
        </div>
    )
}

export default Notifications;
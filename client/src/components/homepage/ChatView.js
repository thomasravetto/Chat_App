function ChatView (props) {
    return (
        <div className="chat_container">
            {props.openedChatId ?
                // props.chatView.map((chat) => (
                //         <div key={chat}>{chat}</div>
                // )) :
                <p>{props.openedChatId}</p> :
                <div>Select a Chat to open it</div>
            }
        </div>
    )
}

export default ChatView;


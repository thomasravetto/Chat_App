function ChatView (props) {
    return (
        <div className="chat_container">
            {props.chatView ?
                props.chatView.map((chat) => (
                    <div key={chat}>{chat}</div>
                )) :
                <div>Select a Chat to open it</div>
            }
        </div>
    )
}

export default ChatView;


import { useEffect, useState } from 'react';

function ChatView(props) {
  const API_URL = 'https://localhost:3500/v1';
  const [messages, setMessages] = useState([]);
  const [toBeSentMessage, setToBeSentMessage] = useState('');

  async function loadMessages(openedChatId) {
    const resp = await fetch(API_URL + '/messages/get_messages', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: openedChatId,
      }),
    });

    const messagesData = await resp.json();

    console.log(messagesData, messages);

    if (messagesData.length !== 0 && messagesData[0] && messagesData[0].content) {
      setMessages(messagesData);
    } else if (messagesData.error === 'No messages were found') {
        setMessages([]);
    }
  }

  async function sendMessage (chatId, senderId, content) {
    if (!content) {
        return;
    }
    const resp = await fetch(API_URL + '/messages/send_message', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            chatId: chatId,
            senderId: senderId,
            content: content
        })
    });

    const newMessage = await resp.json();

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setToBeSentMessage('');
  }

  function onMessageChange (event) {
    setToBeSentMessage(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();

        sendMessage(props.openedChatId, props.userId, toBeSentMessage);
      }
  }

  useEffect(() => {
    setMessages([]);

    loadMessages(props.openedChatId);
  }, [props.openedChatId]);

  return (
    <div className="chat_container">
      {props.openedChatId ? (
        messages.length !== 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={
                props.userId === message.senderid
                  ? 'message sentbyuser'
                  : 'message sentbyfriend'
              }
            >
              {message.content}
            </div>
          ))
        ) : (
          <div></div>
        )
      ) : (
        <div>Select a Chat to open it</div>
      )}
      {props.openedChatId && (
        <div className='messages_form'>
            <textarea onChange={onMessageChange} onKeyDown={handleKeyPress} type='text' className='messages_input' value={toBeSentMessage} rows={1}></textarea>
            <button onClick={() => sendMessage(props.openedChatId, props.userId, toBeSentMessage)} className='messages_button'>&#8594;</button>
        </div>
        )}
    </div>
  );
}

export default ChatView;
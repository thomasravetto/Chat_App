import { useEffect, useRef, useState } from 'react';

function ChatView(props) {
  const API_URL = 'https://localhost:3500/v1';
  const [messages, setMessages] = useState([]);
  const [toBeSentMessage, setToBeSentMessage] = useState('');
  const chatContainerRef = useRef(null);

  async function loadMessages(openedChatId) {
    const resp = await fetch(API_URL + '/messages/get_messages', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: openedChatId,
      }),
    });

    const messagesData = await resp.json();

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

    sendMessageOnSocket(props.io, newMessage.chatid, newMessage);
    setToBeSentMessage('');
  }

  function sendMessageOnSocket(socket, chatId, message) {
    if (message) {
      socket.emit('send_message', {chatId, message});
      setMessages(prevMessages => [...prevMessages, message]);
    }
  }

  function connectToChatOnSocket(socket, chatId) {
    socket.emit('join', chatId);
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
    if (props.openedChatId) {
      connectToChatOnSocket(props.io, props.openedChatId);

      setMessages([]);

      loadMessages(props.openedChatId);
    }
  }, [props.openedChatId]);

  useEffect(() => {
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      console.log('new, message', newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage.message]);
    }

    props.io.on('receive_message', handleReceiveMessage);

    props.io.on('user_connected', (message) => {
      console.log(message);
    })

    return () => {
      props.io.off('receive_message', handleReceiveMessage);
    }
  }, [ props.io ]);

  return (
    <div className="chat_container" ref={chatContainerRef}>
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
      <div className='messages_form_container'>
        <div className='messages_form'>
            <textarea onChange={onMessageChange} onKeyDown={handleKeyPress} type='text' className='messages_input' value={toBeSentMessage} rows={1}></textarea>
            <button onClick={() => sendMessage(props.openedChatId, props.userId, toBeSentMessage)} className='messages_button'>&#8594;</button>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
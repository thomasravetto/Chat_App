import { useEffect, useRef, useState } from 'react';
import React from 'react';
import friendsFeed from '../../example_images/friends_feed.png';
import friendsSearchBox from '../../example_images/searchbar.png';
import friendsNotification from '../../example_images/notifications.png';

function ChatView(props) {

  const API_URL = props.API_URL;

  const [messages, setMessages] = useState([]);
  const [toBeSentMessage, setToBeSentMessage] = useState('');
  const messageContainerRef = useRef(null);

  function formattedDate (dateToFormat) {
    const date = new Date(dateToFormat);
    const hours = date.getHours();
    const minutes = date.getMinutes(); // Months are zero-based

    // Ensure leading zero for day and month if they are single digits
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes}`;
  };

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
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      setMessages(prevMessages => [...prevMessages, newMessage.message]);
    }

    props.io.on('receive_message', handleReceiveMessage);

    return () => {
      props.io.off('receive_message', handleReceiveMessage);
    }
  }, [ props.io ]);

  return (
    <div className='chat_container'>
      <div className='message_container' ref={messageContainerRef}>
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
              <div className='message_content'>
                 {message.content.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    <br/>
                  </React.Fragment>
                  ))}
              </div>
              <p className='message_time'>{formattedDate(message.timestamp)}</p>
            </div>
          ))
        ) : (
          <div></div>
        )
      ) : (
        <div className='no_chat_container'>
          <h2 className='example_title'>Select a chat to open it...</h2>
          <img className='friends_feed_image' src={friendsFeed} alt="Friends Feed"></img>
          <h2 className='example_title'>And if you don't have any friend yet...</h2>
          <div className='example_images_container'>
            <div className='example_image'>
              <h2>search one in the searchbar</h2>
              <img className='searchbar_friend_image' src={friendsSearchBox} alt="Searchbar Friend"></img>
            </div>
            <h2>or</h2>
            <div className='example_image'>
              <h2>check if someone has sent you a request</h2>
              <img className='notification_friend_image' src={friendsNotification} alt="Notification Friend"></img>
            </div>
          </div>
        </div>

      )}
      </div>
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
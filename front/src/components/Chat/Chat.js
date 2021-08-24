import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.scss';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:3000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {});

    return () => {
      socket.emit('disconnect');

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  };

  console.log(message, messages);

  return (
    <div className="chat-outer-container">
      <div className="chat-inner-container">
        <div className="chat-left-container">
          <img className="logo" src="img/logo_small.png" alt="cherry talk logo" />
          <div className="chat-info-container">
            <h2>정보</h2>
            <div className="info-container">
              <h3>방 이름</h3>
              <div className="info-text">{room}</div>
            </div>
            <div className="info-container">
              <h3>닉네임</h3>
              <div className="info-text">{name}</div>
            </div>
          </div>
        </div>
        <div className="chat-right-container">
          <div className="message-container"></div>
          <div className="chat-btm-container">
            <input
              className="send-message-input"
              placeholder="메세지 입력"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
            />
            <img className="send-btn" src="img/logo_small.png" alt="send button" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

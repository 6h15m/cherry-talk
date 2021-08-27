import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';

import Messages from '../Messages/Messages';
import Input from '../Input/Input';

import './Chat.scss';
import Participants from '../Participants/Participants';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'localhost:3000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

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
          <Link to="/">
            <img className="logo" src="img/logo_small.png" alt="cherry talk logo" />
          </Link>
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
            <Participants users={users} />
          </div>
        </div>
        <div className="chat-right-container">
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;

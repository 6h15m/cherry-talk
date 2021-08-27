import React from 'react';
import './Message.scss';

const Message = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  let isAdmin = false;

  const trimmedName = name.trim().toLowerCase();

  if (user === 'admin') {
    isAdmin = true;
  } else if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isAdmin ? (
    <div className="admin-messsage">{text}</div>
  ) : isSentByCurrentUser ? (
    <div className="message-container justify-end">
      <div className="message-box background-green">
        <p className="message-text">{text}</p>
      </div>
    </div>
  ) : (
    <div className="message-container justify-start">
      <p className="sent-text">{user}</p>
      <div className="message-box background-red">
        <p className="message-text">{text}</p>
      </div>
    </div>
  );
};

export default Message;

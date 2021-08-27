import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './Messages.scss';
import Message from '../Message/Message';

const Messages = ({ messages, name }) => (
  <ScrollToBottom>
    <div className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </div>
  </ScrollToBottom>
);

export default Messages;

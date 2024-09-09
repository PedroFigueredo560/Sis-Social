import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './style.css';
import { IconButton } from '@mui/material';
import { Close, Message, Send } from '@mui/icons-material';

const socket = io("http://localhost:3001");

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);  // Inicialmente fechado

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      socket.emit('chat message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <div className={isOpen ? 'blur-background' : ''}>
      </div>

      {!isOpen && (
        <div className="chat-link" onClick={() => setIsOpen(true)}>
          <IconButton edge="end" onClick={() => setIsOpen(true)}>
            <Message sx={{ fontSize: 24 }} />
          </IconButton>
        </div>
      )}

      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">
            <h3>Chat</h3>
            <span className="material-icons">
              <IconButton edge="end" onClick={() => setIsOpen(false)}>
                <Close sx={{ fontSize: 24 }} />
              </IconButton>
            </span>
          </div>
          <div className="messages">
            {messages.length === 0 && (
              <div className="no-messages">
                Digite sua mensagem para iniciar a conversa.
              </div>
            )}
            {messages.map((msg, index) => (
              <div key={index} className="message">
                {msg}
              </div>
            ))}
          </div>
          <form className="input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem"
            />
            <IconButton type="submit" edge="end" color="primary">
              <Send sx={{ fontSize: 24 }} />
            </IconButton>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;

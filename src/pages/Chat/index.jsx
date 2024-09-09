import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './style.css';
import { IconButton } from '@mui/material';
import { Close, Message, Send } from '@mui/icons-material';
import {jwtDecode} from 'jwt-decode';  // Decodificar o token
import axios from 'axios';  // Para fazer requisições HTTP

const socket = io("http://localhost:3001");

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);  // Inicialmente fechado
  const [userInfo, setUserInfo] = useState(null);  // Informações do usuário
  const [userType, setUserType] = useState('');  // Tipo de usuário (funcionário ou beneficiário)

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        const userFunc = decodedToken.user;  // Assumindo que o campo `user` é o identificador

        if (decodedToken.role === 'funcionario') {
          // Se for funcionário, buscar dados de funcionário
          setUserType('funcionario');
          const response = await axios.get('http://localhost:5000/get_func', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const funcionario = response.data.find(func => func.user_func === userFunc);
          if (funcionario) {
            setUserInfo(funcionario.name_func);  // Armazena o nome do funcionário
          }
        } else if (decodedToken.role === 'beneficiario') {
          // Se for beneficiário, buscar dados de beneficiário
          setUserType('beneficiario');
          const response = await axios.get('http://localhost:5000/get_ben', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const beneficiario = response.data.find(ben => ben.user_ben === userFunc);
          if (beneficiario) {
            setUserInfo(beneficiario.name_ben);  // Armazena o nome do beneficiário
          }
        }
      }
    };

    fetchUserData();

    // Receber mensagens do servidor
    socket.on('chat message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && userInfo) {
      // Envia o nome completo do usuário com a mensagem
      const chatMessage = { user: userInfo, text: message };
      socket.emit('chat message', chatMessage);
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
                <strong>{msg.user}:</strong> {msg.text}
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
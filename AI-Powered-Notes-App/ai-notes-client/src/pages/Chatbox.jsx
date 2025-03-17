import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Chatbox = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatboxRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = { sender: 'You', text: message };

    try {
      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true); 

      const response = await axios.post('http://localhost:3001/api/messages', { message });
      const ollamaMessage = { sender: 'Ollama', text: response.data.reply };

      setMessages((prev) => [...prev, ollamaMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsTyping(false);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox-header">
        <h2>Chat</h2>
      </div>

      <div className="chatbox-messages" ref={chatboxRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === 'You' ? 'sent' : 'received'}`}>
            <p><strong>{msg.sender}:</strong> {msg.text}</p>
          </div>
        ))}

        {isTyping && (
          <div className="message received typing-indicator">
            <p><strong>Bot:</strong> typing...</p>
          </div>
        )}
      </div>

      <form className="chatbox-input" onSubmit={handleSendMessage}>
        <textarea
          rows={1}
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
};

export default Chatbox;

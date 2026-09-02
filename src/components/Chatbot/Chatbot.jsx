import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, RefreshCw, AlertCircle } from 'lucide-react';
import { chatWithAssistant } from '../../services/geminiService';
import styles from './Chatbot.module.css';

const Chatbot = () => {
  const isKeyMissing = !import.meta.env.VITE_GEMINI_API_KEY;
  const initialMessage = isKeyMissing 
    ? "Hi there! I'm your AI travel assistant. (Demo Mode: I can help with basic questions about our destinations!)"
    : "Hi there! I'm your AI travel assistant. Where would you like to go?";
    
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', parts: [{ text: initialMessage }] }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user', parts: [{ text: userMessage }] }];
    setMessages(newMessages);
    setIsLoading(true);

    if (isKeyMissing) {
      setTimeout(() => {
        let reply = "I'm currently in demo mode, but I recommend checking out our Destinations page to see beautiful places like Paris, Tokyo, and Bali!";
        if (userMessage.toLowerCase().includes("paris")) reply = "Paris is beautiful! The Eiffel Tower and Louvre are must-sees. Best time to visit is Spring.";
        else if (userMessage.toLowerCase().includes("tokyo")) reply = "Tokyo is amazing! Don't miss the Shibuya Crossing and Senso-ji Temple.";
        else if (userMessage.toLowerCase().includes("bali")) reply = "Bali is perfect for relaxation. Visit the rice terraces and beautiful temples.";
        
        setMessages([...newMessages, { role: 'model', parts: [{ text: reply }] }]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    try {
      const historyForApi = messages.slice(1).map(m => ({ role: m.role, parts: [...m.parts] }));
      const responseText = await chatWithAssistant(userMessage, historyForApi);
      setMessages([...newMessages, { role: 'model', parts: [{ text: responseText }] }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'model', parts: [{ text: "Sorry, I'm having trouble connecting right now. Please try again later." }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        className={`${styles.toggleBtn} ${isOpen ? styles.hidden : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </button>

      <div className={`${styles.chatWindow} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <div>
            <h3>AI Travel Assistant</h3>
            <span className={styles.status}>{isKeyMissing ? 'Demo Mode' : 'Online'}</span>
          </div>
          <div className={styles.headerActions}>
            <button onClick={() => setMessages([{ role: 'model', parts: [{ text: initialMessage }] }])} aria-label="Reset chat">
              <RefreshCw size={16} />
            </button>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`${styles.message} ${styles[msg.role]}`}>
              <div className={styles.messageContent}>
                {msg.parts[0].text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.message} ${styles.model}`}>
              <div className={styles.messageContent}>
                <Loader2 size={16} className={styles.spinner} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputArea}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about destinations, tips..."
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading} aria-label="Send message">
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default Chatbot;

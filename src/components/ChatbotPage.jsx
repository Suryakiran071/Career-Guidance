import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/195.jpg'; // Path to your background image

function ChatbotPage() {
  // State to store the user's query, chatbot's response, and loading status
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]); // Store the chat history
  const messagesEndRef = useRef(null); // Reference for auto-scrolling
  const [chatHeight, setChatHeight] = useState('h-72'); // State to control chat height

  // Handle change in input field
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Function to handle form submission and get the response from the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; // Prevent empty submissions
    setLoading(true);

    // Append the user's message to the chat history
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: query, sender: 'user' },
    ]);
    setQuery(''); // Clear input field
    setChatHeight('h-96'); // Increase chat height after a message is sent

    try {
      const res = await axios.post('http://localhost:8000/chatbot', {
        query: query,
      });

      // Append the AI's response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: res.data.response, sender: 'ai' },
      ]);
      setResponse(res.data.response); // Set the AI response
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Sorry, I am unable to process your request right now.', sender: 'ai' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom of the chat whenever a new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="flex justify-center items-center h-screen">
      {/* Left Half (Heading Section with Background Image) */}
      <div
        className="w-1/2 h-full bg-cover bg-center flex justify-center items-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        
      </div>

      {/* Right Half (Chatbot Section) */}
      <div className="w-2/5 p-6 pt-10 mt-10 bg-white rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold mb-6 text-Black">Welcome to Career Guidance Chatbot</h2>
          <p className="text-xl text-black">
            Ask any questions related to career advice, job roles, and more. Let's get started!
          </p>

        {/* Chat history display with dynamic height */}
        <div className={`space-y-4 overflow-y-scroll p-4 bg-gray-100 rounded-md mb-4 ${chatHeight}`}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs rounded-lg p-3 text-white ${
                  message.sender === 'user' ? 'bg-teal-500' : 'bg-teal-600'
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-xs p-3 text-white bg-teal-600 rounded-lg">
                <p>Loading...</p>
              </div>
            </div>
          )}
          {/* Reference for scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input form with send button inside */}
        <form onSubmit={handleSubmit} className="flex items-center space-x-3 mt-auto">
          <input
            type="text"
            id="query"
            value={query}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="w-full p-3 border border-teal-600 rounded-l-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="submit"
            className="p-3 bg-teal-600 text-white font-semibold rounded-r-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatbotPage;

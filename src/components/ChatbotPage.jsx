import React, { useState } from 'react';
import axios from 'axios';

function ChatbotPage() {
  // State to store the user's query and chatbot's response
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle change in input field
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Function to handle form submission and get the response from backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(''); // Clear previous response

    try {
      const res = await axios.post('http://localhost:8000/chatbot', {
        query: query,
      });
      setResponse(res.data.response);
    } catch (error) {
      console.error('Error fetching chatbot response:', error);
      setResponse('Sorry, I am unable to process your request right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Career Guidance Chatbot</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="query" className="block text-lg text-gray-700">Ask a question:</label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your question here"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {loading ? 'Loading...' : 'Ask'}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-800 mb-4">Response:</h3>
        <div className="p-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm">
          <p className="text-gray-700">{response || 'Ask me anything about career guidance or job recommendations!'}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatbotPage;

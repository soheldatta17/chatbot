import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import your CSS file

const App = () => {
  const [question, setQuestion] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [typedResponse, setTypedResponse] = useState('');

  const typeSpeed = 30; // Adjust the speed of typing (milliseconds per character)

  useEffect(() => {
    if (botResponse && !loading) {
      setTypedResponse('');
      simulateTyping(botResponse);
    }
  }, [botResponse, loading]);

  const simulateTyping = (text) => {
    let index = 0;

    const typingInterval = setInterval(() => {
      setTypedResponse((prevTyped) => prevTyped + text[index]);
      index++;

      if (index === text.length) {
        clearInterval(typingInterval);
      }
    }, typeSpeed);
  };

  const submitQuestion = async () => {
    if (question.trim() === '') {
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        contents: [
          {
            parts: [
              {
                text: question,
              },
            ],
          },
        ],
      };

      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCnMeaOj5kOQKLo_K9a86yda0dBuCTxXkU`,
        requestData
      );

      const generatedText = response.data.candidates[0].content.parts[0].text;
      const formattedText = generatedText.replace(/\n/g, ' ');

      setBotResponse(formattedText);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chat-header">Chat with Bot</div>
      <div className="chat-body">
        <div className="input-container">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your question..."
          />
          <button onClick={submitQuestion} disabled={loading}>
            Submit
          </button>
        </div>

        <div className="response-container">
          {loading && <p className="loading">Bot: Generating...</p>}
          {!loading && botResponse && <p className="bot-response">Bot: {typedResponse}</p>}
        </div>
      </div>
    </div>
  );
};

export default App;

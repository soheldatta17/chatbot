import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [question, setQuestion] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [loading, setLoading] = useState(false);

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
    <div>
      <div>
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

      {loading && <p>Bot: Generating...</p>}
      {!loading && botResponse && <p>Bot: {botResponse}</p>}
    </div>
  );
};

export default Chatbot;

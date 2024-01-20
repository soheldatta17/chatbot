import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import your CSS file
import { useSpring, animated } from 'react-spring';

const Chatbot = ({setChat}) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2500 }, // Adjust the duration as needed
  });
  const [question, setQuestion] = useState('');
  const [botResponse, setBotResponse] = useState('');
  const [load, setLoad] = useState(false);
  const [enter, setEnter] = useState('Enter Your Question')
  const simulateTyping = (text) => {
    let index = 0;
    text = text.replace(/\btrained by Google\b/gi, 'trained by Sohel');
    const cleanText = String(text);
    

    const typingInterval = setInterval(() => {
      setBotResponse((prevBotResponse) => cleanText.slice(0, index));
      index++;
      setLoad(true)

      if (index === cleanText.length) {
        clearInterval(typingInterval);
      }
    }, 30);
     // Adjust the typing speed as needed
  };

  const submitQuestion = async () => {
    if (question.trim() === '') {
      return;
    }

    try {
      setLoad(false)
      setEnter('Generating...')
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

      setBotResponse(''); // Clear the previous response
      simulateTyping(generatedText);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <animated.div style={props}>
      <h1 className='head'>Made by Sohel</h1>
      <div className={`chatbot-container alt3`}>
        <div className="chat-header">Chat with Me
        <button onClick={()=>
        {
            setChat(false)
        }}>
              Analyze Images
            </button>
        </div>
        <br/><br/>
        <div className="chat-body">
          <div className="input-container">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question..."
            />
            <button onClick={submitQuestion}>
              Submit
            </button>
          </div>

          <div className="response-container">
            {!load && <p className="loading"><b>SOHEL:</b> {enter}</p>}
            {load && <p className="bot-response"><b>SOHEL:</b> {botResponse}</p>}
          </div>
        </div>
      </div>
      </animated.div>
    </>
  );
};

export default Chatbot;

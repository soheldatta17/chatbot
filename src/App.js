import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'; // Import your CSS file
import Chatbot from './Chatbot';
import Pic from './Pic';

const App = () => {
  const [chat, setChat] = useState(true);
  if (chat)
  {
    return(
      <Chatbot setChat={setChat}/>
    )
  }
  else
  {
    return(
      <Pic setChat={setChat}/>
    )
  }

}
export default App;

import React, { useState } from 'react';
import './Chatbot.css'; // Import your CSS file
import Chatbot from './Chatbot';
import Pic from './Pic';

const App = () => {
  const [chat, setChat] = useState(true);
  return(
    (chat)?<Chatbot setChat={setChat}/>:<Pic setChat={setChat}/>
  )

}
export default App;

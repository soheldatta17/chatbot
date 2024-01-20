import React, { useState } from 'react';
import './Chatbot.css'; // Import your CSS file
import Chatbot from './Chatbot';
import Pic from './Pic';
import { injectSpeedInsights } from '@vercel/speed-insights';
import { inject } from '@vercel/analytics';
inject();
injectSpeedInsights();

const App = () => {
  const [chat, setChat] = useState(true);
  return(
    (chat)?<Chatbot setChat={setChat}/>:<Pic setChat={setChat}/>
  )

}
export default App;

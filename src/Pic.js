import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Image.css';
const genAI = new GoogleGenerativeAI("AIzaSyCnMeaOj5kOQKLo_K9a86yda0dBuCTxXkU");

async function generateDescription(imagePart) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const result = await model.generateContent(["Describe the image:", imagePart]);
  const response = await result.response;
  const text = response.text();

  return text;
}

const Pic = ({setChat}) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const simulateTyping = async (text) => {
    setLoading(true);
  
    let index = 0;
  
    // Convert any non-string values to an empty string
    const cleanText = String(text);
  
    const typingInterval = setInterval(() => {
      if (index <= cleanText.length) {
        setDescription((prevDescription) => cleanText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 30); // Adjust the typing speed as needed
  };
  // Example usage
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);

    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  };

  const submitDescriptionRequest = async () => {
    try {
      if (!selectedImage) {
        console.error('No image selected.');
        return;
      }
      setLoading(false);

      const arrayBuffer = await selectedImage.arrayBuffer();
      const base64Data = arrayBufferToBase64(arrayBuffer);

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: selectedImage.type,
        },
      };

      

      var text = await generateDescription(imagePart);

      setDescription('');
      text = text.replace(/\bundefined\b/g, "");
      console.log(text)
      simulateTyping(text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // ... (rest of the code)

  return (
    <>
    <h1 className='head'>Made by Sohel</h1>
    <div className="container">
    <div className="chat-header">
      <h2 className="title">Image Description Generator</h2>
      <button onClick={()=>
        {
            setChat(true)
        }}>
              Start Chatting
            </button>
      </div>
      <div className="fileContainer">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button className="button" onClick={submitDescriptionRequest}>
          Generate Description
        </button>
      </div>
      <div>
        {selectedImage && (
          <div className="selectedImage">
            <h2>Selected Image:</h2>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Selected"
              style={{ maxWidth: '100%', maxHeight: '300px' }}
            />
          </div>
        )}
        {!loading && <p className="loading">Analyzing Image...</p>}
        {loading && description && (
          <p className="description"><b>SOHEL:</b> {description}</p>
        )}
      </div>
    </div>
    </>
  );
};

export default Pic;

import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  // Change the title of the webpage
  useEffect(() => {
    document.title = "GroupChatEmojiStats"; // Custom title instead of "localhost"
  }, []);

  const handleLogin = () => {
    if (username.trim()) {
      setIsLoggedIn(true);
      setTimeout(() => {
        setShowPopup(true);
      }, 1000);
    }
  };

  useEffect(() => {
    if (showPopup) {
      window.alert("🚀 Coming Soon! Stay Tuned!");
      setShowPopup(false);
    }
  }, [showPopup]);

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <div className="login-container">
          <h1 className="project-name">🔥 GroupChatEmojiStats 🔥</h1>
          <p className="tagline">Discover the most overused emojis in your group chats!</p>
          
          <input 
            type="text" 
            placeholder="Enter Your Name" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            className="input-field"
          />
          
          <button 
            className="login-btn animated-btn" 
            onClick={handleLogin} 
            disabled={!username.trim()} 
          >
            🚀 Start Exploring
          </button>
        </div>
      ) : (
        <div className="dashboard">
          <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>Logout</button>
          <h2>Welcome, {username}! 🎉</h2>
          <p>Your most frequently used emojis will appear here soon.</p>
        </div>
      )}
    </div>
  );
};

export default App;

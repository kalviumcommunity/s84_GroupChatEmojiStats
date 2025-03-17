import React, { useState, useEffect } from "react";
import "./App.css";
import EmojiStats from "./components/EmojiStats.jsx";

// Login Component
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
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
  );
};

// Main App Component
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "GroupChatEmojiStats";
  }, []);

  const handleLogin = (name) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUsername("");
    setIsLoggedIn(false);
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="dashboard">
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          <h2>Welcome, {username}! 🎉</h2>
          <p>Your most frequently used emojis will appear here soon.</p>

          {/* New Feature: Recent Emoji Stats */}
          <EmojiStats />
        </div>
      )}
    </div>
  );
};

export default App;

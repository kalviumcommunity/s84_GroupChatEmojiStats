import React, { useState, useEffect } from "react";
import "./App.css";
import EmojiStats from "./components/EmojiStats.jsx";
import { getEmojis } from "./api.js"; // Import API function

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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleFetchEmojis = async () => {
    setLoading(true);
    try {
      console.log("Fetching emojis...");
      
      const data = await getEmojis();
      console.log("Fetched Emojis:", data); // Debugging
      
      if (!Array.isArray(data)) {
        console.error("API did not return an array:", data);
        return;
      }
  
      setEmojis(data);
    } catch (error) {
      console.error("Error fetching emojis:", error);
    }
    setLoading(false);
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

          {/* Fetch Data Button */}
          <button className="fetch-btn" onClick={handleFetchEmojis}>
            {loading ? "Loading..." : "Fetch Emoji Data"}
          </button>

          {/* Display Fetched Emojis */}
          {emojis.length > 0 ? (
            <ul>
              {emojis.map((emoji) => (
                <li key={emoji._id}>{emoji.emoji} - {emoji.count}</li>
              ))}
            </ul>
          ) : (
            <p>No emojis found. Try adding some!</p>
          )}

          {/* New Feature: Recent Emoji Stats */}
          <EmojiStats />
        </div>
      )}
    </div>
  );
};

export default App;

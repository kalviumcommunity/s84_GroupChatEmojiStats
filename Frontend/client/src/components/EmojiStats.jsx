import React from "react";
import "./EmojiStats.css"; // Import the CSS file for styling

const EmojiStats = () => {
  const dummyEmojiData = [
    { emoji: "😂", count: 125 },
    { emoji: "❤️", count: 97 },
    { emoji: "🔥", count: 85 },
    { emoji: "👍", count: 76 },
    { emoji: "😭", count: 64 },
  ];

  return (
    <div className="emoji-stats-container">
      <h3 className="emoji-stats-title">🔥 Recent Emoji Stats 🔥</h3>
      <ul className="emoji-list">
        {dummyEmojiData.map((item, index) => (
          <li key={index} className="emoji-item">
            <span className="emoji">{item.emoji}</span>
            <span className="count">Used {item.count} times</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmojiStats;

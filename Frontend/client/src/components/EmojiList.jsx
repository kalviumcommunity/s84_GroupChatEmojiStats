import { useEffect, useState } from "react";

const EmojiList = () => {
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/emojis`)
      .then((res) => res.json())
      .then((data) => setEmojis(data))
      .catch((err) => console.error("Error fetching emojis:", err));
  }, []);

  return (
    <div>
      <h2>Emoji Stats</h2>
      <ul>
        {emojis.map((emoji) => (
          <li key={emoji._id}>{emoji.emoji} - {emoji.usageCount}</li>
        ))}
      </ul>
    </div>
  );
};

export default EmojiList;

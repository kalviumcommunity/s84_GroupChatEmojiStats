import { useState } from "react";

const EmojiList = () => {
  const [emojis, setEmojis] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmojis = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/emojis`);
      const data = await response.json();
      setEmojis(data);
    } catch (error) {
      console.error("Error fetching emojis:", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Emoji Stats</h2>
      
      {/* Fetch Button */}
      <button 
        onClick={fetchEmojis} 
        disabled={loading}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        {loading ? "Loading..." : "Fetch Emojis"}
      </button>

      {/* Emoji List */}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {emojis.length > 0 ? (
          emojis.map(({ _id, emoji, count }) => (
            <li key={_id} style={{ fontSize: "18px", marginBottom: "8px" }}>
              {emoji} - {count}
            </li>
          ))
        ) : (
          <p>No data available. Click the button to load emojis.</p>
        )}
      </ul>
    </div>
  );
};

export default EmojiList;

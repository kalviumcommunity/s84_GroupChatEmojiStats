const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes"); // Import routes
require("dotenv").config(); // Load environment variables (if using .env)

const app = express();
const PORT = 3010;

app.use(express.json()); // Middleware to parse JSON
app.use("/api", routes); // 👈 Mounts routes under "/api"

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/emojisDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

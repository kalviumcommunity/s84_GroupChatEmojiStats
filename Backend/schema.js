const mongoose = require('mongoose');

const emojiSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    emoji: { type: String, required: true },
    count: { type: Number, default: 1 }
});

module.exports = mongoose.model('Emoji', emojiSchema);

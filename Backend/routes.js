const express = require('express');
const router = express.Router();
const Emoji = require('./schema');

// Get most used emojis for a user
router.get('/emojis', async (req, res) => {
    try {
        const emojis = await Emoji.find().sort({ count: -1 }); // Get all emojis sorted by count (most used first)
        res.json(emojis);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Add or update an emoji
router.post('/emojis', async (req, res) => {
    const { userId, emoji } = req.body;
    try {
        let existingEmoji = await Emoji.findOne({ userId, emoji });
        if (existingEmoji) {
            existingEmoji.count += 1;
            await existingEmoji.save();
        } else {
            existingEmoji = new Emoji({ userId, emoji, count: 1 });
            await existingEmoji.save();
        }
        res.json(existingEmoji);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an emoji
router.delete('/emojis/:userId/:emoji', async (req, res) => {
    try {
        await Emoji.findOneAndDelete({ userId: req.params.userId, emoji: req.params.emoji });
        res.json({ message: 'Emoji deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/emojis/:userId/:emoji', async (req, res) => {
    try {
        const { count } = req.body; // New count value from the request body
        const { userId, emoji } = req.params;

        let updatedEmoji = await Emoji.findOneAndUpdate(
            { userId, emoji },
            { count: count },
            { new: true } // Returns the updated document
        );

        if (!updatedEmoji) {
            return res.status(404).json({ message: 'Emoji not found' });
        }

        res.json(updatedEmoji);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

import axios from 'axios';

const API_BASE_URL = 'https://your-backend-url.com'; // Replace with your actual backend URL

export const getEmojis = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/emojis`);
        return response.data;  // Return the fetched data
    } catch (error) {
        console.error('Error fetching emojis:', error.message);
        return [];
    }
};

// Add a new emoji to the database
export const addEmoji = async (newEmoji) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/emojis`, newEmoji);
        return response.data;
    } catch (error) {
        console.error('Error adding emoji:', error.message);
        return null;
    }
};

// Delete an emoji from the database
export const deleteEmoji = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/api/emojis/${id}`);
        console.log(`Emoji with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting emoji:', error.message);
    }
};

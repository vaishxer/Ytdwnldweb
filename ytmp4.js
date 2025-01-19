// api/ytmp4.js
const axios = require('axios');

module.exports = async (req, res) => {
    const { url } = req.query;
    const apiUrl = process.env.YT_API_MP4_URL; // Accessing the environment variable
    try {
        const response = await axios.get(`${apiUrl}?url=${url}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
};

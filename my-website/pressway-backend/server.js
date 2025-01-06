const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/news', async (req, res) => {
  try {
    const apiKey = '238f51c95d0846b3bd88a066b8bc3775';
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`
    );
    console.log('API Response:', response.data); // Debug log
    res.json(response.data);
  } catch (error) {
    console.error('Server error:', error.response?.data || error.message);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
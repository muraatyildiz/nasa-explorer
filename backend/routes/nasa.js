const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config(); 

const NASA_API_KEY = process.env.NASA_API_KEY;

router.get('/apod', async (req, res) => {
  try {
     const { date } = req.query;
    const response = await axios.get('https://api.nasa.gov/planetary/apod', {
      params: {
        api_key: NASA_API_KEY,
         ...(date && { date })
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('APOD fetch error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch APOD' });
  }
});
router.get('/mars-photos', async (req, res) => {
  const NASA_API_KEY = process.env.NASA_API_KEY;
  const earthDate = req.query.date || '2024-06-01';
  try {
    const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
      params: {
        earth_date: earthDate,
        api_key: NASA_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Mars Photos fetch error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch Mars photos' });
  }
});

module.exports = router;

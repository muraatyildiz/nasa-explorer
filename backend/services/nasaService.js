const axios = require('axios');

require('dotenv').config();
exports.fetchApod = async (date) => {
  const response = await axios.get('https://api.nasa.gov/planetary/apod', {
    params: {
      api_key: process.env.NASA_API_KEY,
      ...(date && { date }),
    },
  });
  return response.data;
};

exports.fetchMarsPhotos = async (date = '2024-06-01') => {
  const response = await axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos', {
    params: {
      api_key:  process.env.NASA_API_KEY,
      earth_date: date,
    },
  });
  return response.data;
};

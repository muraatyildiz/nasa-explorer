const nasaService = require('../services/nasaService');

exports.getApod = async (req, res, next) => {
  try {
    const apodData = await nasaService.fetchApod(req.query.date);
    res.json(apodData);
  } catch (err) {
    next(err);
  }
};

exports.getMarsPhotos = async (req, res, next) => {
  try {
    const photos = await nasaService.fetchMarsPhotos(req.query.date);
    res.json(photos);
  } catch (err) {
    next(err);
  }
};

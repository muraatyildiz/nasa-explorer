const express = require("express");
const router = express.Router();
const {
  getApod,
  getMarsPhotos,
} = require("../controllers/nasaController");

router.get("/apod", getApod);
router.get("/mars-photos", getMarsPhotos);

module.exports = router;

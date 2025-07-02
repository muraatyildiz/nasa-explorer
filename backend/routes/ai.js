const express = require("express");
const router = express.Router();
const { analyzeImage } = require("../controllers/aiController");

router.post("/analysis", analyzeImage);

module.exports = router;

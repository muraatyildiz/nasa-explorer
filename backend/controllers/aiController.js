const aiService = require('../services/aiService');

exports.analyzeImage= async (req, res, next) => {
  try {
    const { imageUrl, title, explanation } = req.body;
    if (!imageUrl || !title || !explanation) {
      return res.status(400).json({ error: 'Missing imageUrl, title or explanation' });
    }

    const analyzeData = await aiService.getAnalysisFromOpenAI({ imageUrl, title, explanation });
    res.json(analyzeData);
  } catch (err) {
    next(err);
  }
};

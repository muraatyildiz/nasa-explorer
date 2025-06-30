const express = require("express");
const router = express.Router();
const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/mood", async (req, res) => {
  const { imageUrl, title, explanation } = req.body;

  if (!imageUrl || !title || !explanation) {
    return res
      .status(400)
      .json({ error: "Missing imageUrl, title or explanation" });
  }

  try {
    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
You are an AI assistant for a space-themed app.

Given the following APOD (Astronomy Picture of the Day) image title and explanation, analyze its mood and visual style. Then, extract **three dominant colors** that would work well as glowing stars on a black background.

The colors must be:
- Visually strong and bright
- Taken directly from the image’s main features
- Vibrant enough to stand out against black

Return the result as valid JSON with the following structure:

{
  "mood": "dreamy and mysterious",
  "style": "neon-glow space theme",
  "colors": ["#A1C6FF", "#FFAD60", "#D94EFF"]
}

Title: "${title}"

Explanation: "${explanation}"
`,
            },
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
      max_tokens: 500,
    });

    const reply = gptResponse.choices[0].message.content;

    const jsonStart = reply.indexOf("{");
    const jsonEnd = reply.lastIndexOf("}");
    const jsonString = reply.slice(jsonStart, jsonEnd + 1);

    try {
      const moodData = JSON.parse(jsonString);
      console.log("Mood Data:", moodData);
      res.json(moodData);
    } catch (jsonErr) {
      console.error("JSON parse error:", reply);
      res.status(500).json({ error: "AI response was not valid JSON" });
    }
  } catch (error) {
    console.error("OpenAI or Imgur API error:", error.message || error);
    res.status(500).json({ error: "Failed to process image" });
  }
});

module.exports = router;

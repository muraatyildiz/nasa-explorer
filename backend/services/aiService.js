const { OpenAI } = require("openai");
const extractJson = require("../utils/extractJSON");

exports.getAnalysisFromOpenAI = async ({ imageUrl, title, explanation }) => {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await openai.chat.completions.create({
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
  return extractJson(response.choices[0].message.content);
};

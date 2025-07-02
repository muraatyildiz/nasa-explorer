function extractValidJSON(text) {
  try {
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    const jsonString = text.slice(jsonStart, jsonEnd + 1);
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error("Failed to extract valid JSON from OpenAI response");
  }
}

module.exports = extractValidJSON;

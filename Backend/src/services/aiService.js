const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

async function askAI(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}



async function safeJsonParse(text) {
  try {
    // First parse
    const first = JSON.parse(text);

    // If first parse is still a string, parse again
    if (typeof first === "string") {
      return JSON.parse(first);
    }
    return first;
  } catch (err) {
    return null;
  }
}


module.exports = { askAI,safeJsonParse };
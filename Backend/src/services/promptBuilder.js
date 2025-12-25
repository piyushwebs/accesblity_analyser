// services/promptBuilder.js

function buildStructuredPrompt(violation) {
  return `
You are a web accessibility expert.

You MUST respond ONLY in valid JSON.
DO NOT use markdown.
DO NOT add extra text.

Analyze the following accessibility violation:

Rule ID: ${violation.id}
Impact: ${violation.impact}
Description: ${violation.description}
Help: ${violation.help}

Return STRICTLY in this JSON format:

{
  "summary": "Short explanation",
  "why_it_matters": "Why this affects accessibility users",
  "how_to_fix": "Steps to fix the issue",
  "code_examples": {
    "bad_example": "Incorrect HTML/CSS",
    "good_example": "Correct HTML/CSS"
  },
  "best_practices": [
    "Practice 1",
    "Practice 2",
    "Practice 3"
  ]
}

Ensure the JSON is valid and parseable.
`;
}

function buildChatPrompt(violation, userQuestion) {
  return `
You are a helpful web accessibility assistant.

Context:
Rule ID: ${violation.id}
Description: ${violation.description}

User question:
${userQuestion}

Answer clearly in plain text.
Do NOT return JSON.
`;
}

module.exports = {
  buildStructuredPrompt,
  buildChatPrompt
};

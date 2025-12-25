const Scan = require("../models/Scan.js");
const { scanPage } = require("../services/accesiblityServices.js");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { askAi } = require("../services/aiService.js");
const {
  buildStructuredPrompt,
  buildChatPrompt,
} = require("../services/promptBuilder");

//Scan karke value ko DB me store karo
module.exports.runScan = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({
        message: "Valid URL is required",
      });
    }

    const data = await scanPage(url);

    const scan = await Scan.create({
      url: data.url,
      summary: data.summary,
      violations: data.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
      })),
      passes: data.passes.map((p) => ({
        id: p.id,
        description: p.description,
      })),
      rawResult: data.rawResult,
    });

    res.status(201).json({
      scanId: scan._id,
      summary: scan.summary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Scan failed",
      error: err.message,
    });
  }
};

//DB se dundh ke bahar nikal

module.exports.getScanById = async (req, res) => {
  try {
    const { scanId } = req.params;
    const scan = await Scan.findById(scanId);

    if (!scan) {
      res.status(404).json({
        message: "Scan not found",
      });
    }

    res.status(201).json({
      summary: scan.summary,
      passes: scan.passes,
      violations: scan.violations,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Can't find Id",
      error: err.message,
    });
  }
};

module.exports.getAiAnswer = async (req, res) => {
  const { scanId, index } = req.params;
  const { mode, userQuestion } = req.body;

  if (!mode || !["structured", "chat"].includes(mode)) {
    return res.status(400).json({
      message: "Invalid mode. Use 'structured' or 'chat'",
    });
  }

  const scan = await Scan.findById(scanId);

  if (!scan) {
    return res.status(404).json({ message: "scan not found" });
  }

  const violation = scan.violations[index];

  if (!violation) {
    return res.status(404).json({ message: "Violations not found" });
  }

  let prompt;

  if(mode === "structured")
  {
    prompt = buildStructuredPrompt(violation);
  }


  if(mode === "chat")
  {
    if(!userQuestion)
    {
      return res.status(404).json({
        message:"userQuestion is required for chat mode"
      });
    }
    prompt = buildChatPrompt(violation,userQuestion);
  }

  const result = await model.generateContent(prompt);
  const aiText = result.response.text();

  if(mode === structured)
  {
    let parsed;
    try{
      parsed = json.parse(aiText);
    }
    catch{
      return res.status(500).json({
        message:"Ai returned invalid JSON",
        raw:aiText
      });
    }
    return res.json(parsed);
  }

return res.json({ answer: aiText });
};

module.exports.home = async (req, res) => {
  try {
    res.json({
      message: "Welcome! you are at home",
    });
  } catch (err) {
    console.log(err);
  }
};

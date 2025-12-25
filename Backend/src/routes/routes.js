const express = require("express");
const router = express.Router();

const {runScan,getScanById,getAiAnswer} = require("../controllers/controllers.js");


router.post("/analyse",runScan);

router.get("/analyse/:scanId",getScanById);

router.post("/ai/example/:scanId/:index",getAiAnswer);


module.exports = router;
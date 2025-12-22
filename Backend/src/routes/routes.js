const express = require("express");
const router = express.Router();

const {runScan,getScanById} = require("../controllers/controllers.js");


router.post("/analyse",runScan);

router.get("/analyse/:scanId",getScanById);


module.exports = router;
const express = require("express");
const { explain } = require("../controllers/aiExplanationController");

const router = express.Router();

router.post("/explain", explain);

module.exports = router;


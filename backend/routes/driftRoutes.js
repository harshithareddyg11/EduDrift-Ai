const express = require("express");
const { analyzeDrift } = require("../controllers/driftController");

const router = express.Router();

router.post("/analyze", analyzeDrift);

module.exports = router;


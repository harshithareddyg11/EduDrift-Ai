const express = require("express");
const { getHeatmap } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/heatmap/:studentId", getHeatmap);

module.exports = router;


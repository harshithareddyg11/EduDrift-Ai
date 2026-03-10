const express = require("express");
const { getIntervention } = require("../controllers/interventionController");

const router = express.Router();

router.get("/:studentId", getIntervention);

module.exports = router;


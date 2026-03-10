const express = require("express");
const { storeStudentData } = require("../controllers/studentController");

const router = express.Router();

router.post("/data", storeStudentData);

module.exports = router;


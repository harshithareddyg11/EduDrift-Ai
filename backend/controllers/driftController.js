const LearningProfile = require("../models/LearningProfile");
const DriftEvent = require("../models/DriftEvent");
const { detectDrift } = require("../services/mlService");

exports.analyzeDrift = async (req, res) => {
  try {
    const { studentId } = req.body || {};
    if (!studentId) {
      return res.status(400).json({ error: "studentId is required" });
    }

    const profile = await LearningProfile.findOne({ studentId }).lean();
    const metrics = profile?.metrics || {
      accuracy: 0,
      solveTime: 0,
      retryCount: 0,
      topicErrorRate: 0
    };

    const mlResult = await detectDrift(metrics);

    await DriftEvent.create({
      studentId,
      metrics,
      driftDetected: Boolean(mlResult?.driftDetected),
      reason: Array.isArray(mlResult?.reason) ? mlResult.reason : []
    });

    return res.json({
      studentId,
      metrics,
      driftDetected: Boolean(mlResult?.driftDetected),
      reason: Array.isArray(mlResult?.reason) ? mlResult.reason : []
    });
  } catch (err) {
    // If ML service is down, surface a clear error.
    const message =
      err?.response?.data?.detail ||
      err?.response?.data?.error ||
      err.message ||
      "Server error";
    return res.status(500).json({ error: message });
  }
};


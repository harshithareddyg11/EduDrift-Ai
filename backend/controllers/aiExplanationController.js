const { buildExplanation } = require("../services/aiExplanationService");

exports.explain = async (req, res) => {
  try {
    const { driftDetected, reason } = req.body || {};

    const explanation = buildExplanation({
      driftDetected: Boolean(driftDetected),
      reason: Array.isArray(reason) ? reason : []
    });

    return res.json({ explanation });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
};


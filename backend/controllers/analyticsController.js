const LearningProfile = require("../models/LearningProfile");

exports.getHeatmap = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) return res.status(400).json({ error: "studentId is required" });

    const profile = await LearningProfile.findOne({ studentId }).lean();
    const topicStats = profile?.topicStats || {};

    const topics = Object.entries(topicStats).map(([topic, stat]) => {
      const total = Number(stat?.total) || 0;
      const correct = Number(stat?.correct) || 0;
      const accuracy = total ? (correct / total) * 100 : 0;
      return {
        topic,
        accuracy: Number(accuracy.toFixed(2)),
        attempts: total,
        incorrect: Math.max(0, total - correct)
      };
    });

    return res.json({ studentId, topics });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
};


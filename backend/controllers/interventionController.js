const LearningProfile = require("../models/LearningProfile");
const DriftEvent = require("../models/DriftEvent");

function buildRecommendations(topics) {
  const weak = topics.filter((t) => t.attempts >= 3 && t.accuracy < 70);
  weak.sort((a, b) => a.accuracy - b.accuracy);

  const recs = [];
  for (const t of weak.slice(0, 5)) {
    recs.push({
      type: "practice",
      topic: t.topic,
      message: `Targeted practice recommended for "${t.topic}" (accuracy ${t.accuracy}%).`
    });
  }

  if (!recs.length) {
    recs.push({
      type: "keep-going",
      message: "No critical weaknesses detected. Continue with spaced practice to maintain mastery."
    });
  }

  return recs;
}

exports.getIntervention = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId) return res.status(400).json({ error: "studentId is required" });

    const profile = await LearningProfile.findOne({ studentId }).lean();
    const topicStats = profile?.topicStats || {};

    const topics = Object.entries(topicStats).map(([topic, stat]) => {
      const total = Number(stat?.total) || 0;
      const correct = Number(stat?.correct) || 0;
      const accuracy = total ? (correct / total) * 100 : 0;
      return { topic, attempts: total, accuracy: Number(accuracy.toFixed(2)) };
    });

    const latestDrift = await DriftEvent.findOne({ studentId })
      .sort({ createdAt: -1 })
      .lean();

    const recommendations = buildRecommendations(topics);

    if (latestDrift?.driftDetected) {
      recommendations.unshift({
        type: "drift",
        message: `Drift detected. Review recent work and provide short remediation on: ${(latestDrift.reason || []).join(
          "; "
        )}.`
      });
    }

    return res.json({
      studentId,
      recommendations,
      latestDrift: latestDrift
        ? {
            driftDetected: latestDrift.driftDetected,
            reason: latestDrift.reason,
            createdAt: latestDrift.createdAt
          }
        : null
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
};


const Student = require("../models/Student");
const QuizInteraction = require("../models/QuizInteraction");
const LearningProfile = require("../models/LearningProfile");

async function ensureStudent(studentId) {
  if (!studentId) return null;
  // We don't assume studentId is a Mongo ObjectId.
  return Student.findOne({ externalId: String(studentId) });
}

async function getOrCreateProfile(studentId) {
  const existing = await LearningProfile.findOne({ studentId });
  if (existing) return existing;
  return LearningProfile.create({ studentId });
}

async function recomputeRecentMetrics(studentId, windowSize = 20) {
  const recent = await QuizInteraction.find({ studentId })
    .sort({ createdAt: -1 })
    .limit(windowSize)
    .lean();

  if (!recent.length) {
    return { accuracy: 0, solveTime: 0, retryCount: 0, topicErrorRate: 0 };
  }

  let correct = 0;
  let solveTimeSum = 0;
  let retrySum = 0;
  const incorrectByTopic = new Map();

  for (const r of recent) {
    if (r.isCorrect) correct += 1;
    else incorrectByTopic.set(r.topic, (incorrectByTopic.get(r.topic) || 0) + 1);
    solveTimeSum += Number(r.solveTime) || 0;
    retrySum += Number(r.retryCount) || 0;
  }

  const accuracy = (correct / recent.length) * 100;
  const solveTime = solveTimeSum / recent.length;
  const retryCount = retrySum / recent.length;
  const topicErrorRate =
    incorrectByTopic.size === 0 ? 0 : Math.max(...Array.from(incorrectByTopic.values()));

  return {
    accuracy: Number(accuracy.toFixed(2)),
    solveTime: Number(solveTime.toFixed(2)),
    retryCount: Number(retryCount.toFixed(2)),
    topicErrorRate: Number(topicErrorRate.toFixed(2))
  };
}

exports.storeStudentData = async (req, res) => {
  try {
    const { studentId, topic, isCorrect, solveTime, retryCount, name, email } = req.body || {};

    if (!studentId) {
      return res.status(400).json({ error: "studentId is required" });
    }
    if (!topic) {
      return res.status(400).json({ error: "topic is required" });
    }
    if (typeof isCorrect !== "boolean") {
      return res.status(400).json({ error: "isCorrect must be boolean" });
    }

    const student = await ensureStudent(studentId);
    if (!student) {
      // Allow frontend to create a student lazily if it posts data first.
      await Student.create({ externalId: String(studentId), name, email }).catch(() => null);
    }

    const interaction = await QuizInteraction.create({
      studentId,
      topic,
      isCorrect,
      solveTime: Number(solveTime) || 0,
      retryCount: Number(retryCount) || 0
    });

    const profile = await getOrCreateProfile(studentId);

    const existingStat = profile.topicStats.get(topic) || { correct: 0, total: 0 };
    const nextStat = {
      correct: existingStat.correct + (isCorrect ? 1 : 0),
      total: existingStat.total + 1
    };
    profile.topicStats.set(topic, nextStat);

    const metrics = await recomputeRecentMetrics(studentId);
    profile.metrics = metrics;

    await profile.save();

    return res.json({
      ok: true,
      interactionId: interaction._id,
      studentId,
      metrics,
      topicStat: { topic, ...nextStat }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
};


const mongoose = require("mongoose");

const TopicStatSchema = new mongoose.Schema(
  {
    correct: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  { _id: false }
);

const LearningProfileSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      unique: true,
      required: true,
      index: true
    },
    metrics: {
      accuracy: { type: Number, default: 0 }, // percent (0-100), computed on recent window
      solveTime: { type: Number, default: 0 }, // avg seconds on recent window
      retryCount: { type: Number, default: 0 }, // avg retries on recent window
      topicErrorRate: { type: Number, default: 0 } // max incorrects-in-a-topic on recent window
    },
    topicStats: {
      type: Map,
      of: TopicStatSchema,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("LearningProfile", LearningProfileSchema);


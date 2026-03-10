const mongoose = require("mongoose");

const DriftEventSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      index: true
    },
    metrics: {
      accuracy: { type: Number, required: true },
      solveTime: { type: Number, required: true },
      retryCount: { type: Number, required: true },
      topicErrorRate: { type: Number, required: true }
    },
    driftDetected: { type: Boolean, required: true },
    reason: { type: [String], default: [] }
  },
  { timestamps: true }
);

module.exports = mongoose.model("DriftEvent", DriftEventSchema);


const mongoose = require("mongoose");

const QuizInteractionSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
      index: true
    },
    topic: { type: String, required: true, trim: true, index: true },
    isCorrect: { type: Boolean, required: true },
    solveTime: { type: Number, required: true, min: 0 },
    retryCount: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizInteraction", QuizInteractionSchema);


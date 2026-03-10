const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    externalId: { type: String, trim: true, unique: true, index: true },
    name: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);


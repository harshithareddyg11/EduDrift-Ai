const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const studentRoutes = require("./routes/studentRoutes");
const driftRoutes = require("./routes/driftRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const interventionRoutes = require("./routes/interventionRoutes");
const aiExplanationRoutes = require("./routes/aiExplanationRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use("/api/student", studentRoutes);
app.use("/api/drift", driftRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/intervention", interventionRoutes);
app.use("/api/ai", aiExplanationRoutes);

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on port ${PORT}`);
  });
}

start().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", err);
  process.exit(1);
});


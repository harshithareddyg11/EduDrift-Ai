const axios = require("axios");

function getBaseUrl() {
  return (process.env.ML_SERVICE_URL || "http://localhost:8000").replace(/\/+$/, "");
}

async function detectDrift(metrics) {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/ml/detect-drift`;

  const { data } = await axios.post(url, {
    accuracy: metrics.accuracy,
    solveTime: metrics.solveTime,
    retryCount: metrics.retryCount,
    topicErrorRate: metrics.topicErrorRate
  });

  return data;
}

module.exports = { detectDrift };


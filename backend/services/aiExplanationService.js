function buildExplanation({ driftDetected, reason }) {
  const reasons = Array.isArray(reason) ? reason.filter(Boolean) : [];

  if (!driftDetected) {
    if (reasons.length) {
      return `No drift was detected. Notable signals: ${reasons.join("; ")}.`;
    }
    return "No drift was detected. The student's recent performance appears stable.";
  }

  if (!reasons.length) {
    return "Drift was detected. Recent learning behavior differs from the expected pattern, suggesting a change in understanding or test-taking conditions.";
  }

  return `Drift was detected. Likely contributors: ${reasons.join("; ")}. Consider reviewing the most recent topics and misconceptions, then provide targeted practice and feedback.`;
}

module.exports = { buildExplanation };


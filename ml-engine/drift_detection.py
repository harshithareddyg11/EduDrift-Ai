from __future__ import annotations

from dataclasses import dataclass

import numpy as np
from sklearn.ensemble import IsolationForest

from preprocessing import to_feature_vector


@dataclass(frozen=True)
class DriftResult:
    driftDetected: bool
    reason: list[str]


def _train_baseline_model(random_state: int = 42) -> IsolationForest:
    """
    IsolationForest needs a fitted baseline. We approximate "normal" student behavior
    with synthetic samples in plausible ranges.
    """
    rng = np.random.default_rng(random_state)

    # accuracy: 70-100, solveTime: 30-120, retryCount: 0-2, topicErrorRate: 0-2
    accuracy = rng.uniform(70, 100, size=600)
    solve_time = rng.uniform(30, 120, size=600)
    retry_count = rng.uniform(0, 2, size=600)
    topic_error_rate = rng.uniform(0, 2, size=600)

    X = np.column_stack([accuracy, solve_time, retry_count, topic_error_rate]).astype(float)

    model = IsolationForest(
        n_estimators=200,
        contamination=0.1,
        random_state=random_state,
    )
    model.fit(X)
    return model


_MODEL = _train_baseline_model()


def _rule_reasons(payload: dict) -> list[str]:
    reasons: list[str] = []
    try:
        accuracy = float(payload.get("accuracy", 0))
        solve_time = float(payload.get("solveTime", 0))
        retry_count = float(payload.get("retryCount", 0))
        topic_error_rate = float(payload.get("topicErrorRate", 0))
    except Exception:
        return reasons

    # Rule explanations requested by spec
    if accuracy < 60:
        reasons.append("Accuracy dropped significantly")
    if solve_time < 30:
        reasons.append("Solve time reduced drastically")
    if retry_count > 3:
        reasons.append("High retry count")
    if topic_error_rate > 2:
        reasons.append("Repeated mistakes in topics")

    return reasons


def detect_drift(payload: dict) -> DriftResult:
    x = to_feature_vector(payload)
    pred = int(_MODEL.predict(x)[0])

    drift = pred == -1
    reasons = _rule_reasons(payload)

    # If the model flags drift but no rule triggers, still return an explanation stub
    if drift and not reasons:
        reasons = ["Anomalous learning pattern detected"]

    return DriftResult(driftDetected=drift, reason=reasons)


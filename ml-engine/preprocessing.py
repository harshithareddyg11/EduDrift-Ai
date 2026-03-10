import numpy as np


def to_feature_vector(payload: dict) -> np.ndarray:
    """
    Returns shape (1, 4) as:
    [accuracy, solveTime, retryCount, topicErrorRate]
    """
    accuracy = float(payload.get("accuracy", 0.0))
    solve_time = float(payload.get("solveTime", 0.0))
    retry_count = float(payload.get("retryCount", 0.0))
    topic_error_rate = float(payload.get("topicErrorRate", 0.0))
    return np.array([[accuracy, solve_time, retry_count, topic_error_rate]], dtype=float)


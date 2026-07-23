import React from "react";

const formatMetric = (value, suffix = "") => {
	if (value === null || value === undefined || Number.isNaN(Number(value))) {
		return "—";
	}

	const numericValue = Number(value);
	return `${Math.round(numericValue * 100) / 100}${suffix}`;
};

export default function PostureChecker({
	postureFeedback,
	postureDebug,
	postureTuning,
	isPostureChecking,
	postureVideoRef,
	onRunPostureCheck,
	onSetPostureTuning,
	onResetPostureTuning,
}) {
	const feedback = postureFeedback ?? {};
	const debug = postureDebug ?? {};
	const tuning = postureTuning ?? {};

	const handleNumberChange = (key) => (event) => {
		const nextValue = Number(event.target.value);
		if (Number.isNaN(nextValue) || !onSetPostureTuning) return;
		onSetPostureTuning((prev) => ({
			...(prev ?? {}),
			[key]: nextValue,
		}));
	};

	return (
		<section className="interview-info posture-checker-card" aria-live="polite">
			<div className="posture-checker-header">
				<h3>Posture Check</h3>
				<button
					type="button"
					className="select-avatar-btn"
					onClick={onRunPostureCheck}
					disabled={Boolean(isPostureChecking)}
				>
					{isPostureChecking ? "Checking..." : "Run Check"}
				</button>
			</div>

			<p className="voice-input-hint">
				{feedback.statusMessage || "Use the camera preview to evaluate framing and lighting."}
			</p>

			<div className="results-stats posture-mini-stats">
				<div className="result-stat">
					<span className="stat-label">Status</span>
					<span className="stat-value">{feedback.status || "pending"}</span>
				</div>
				<div className="result-stat">
					<span className="stat-label">Score</span>
					<span className="stat-value">{formatMetric(feedback.score)}</span>
				</div>
				<div className="result-stat">
					<span className="stat-label">Source</span>
					<span className="stat-value">{debug.source || "idle"}</span>
				</div>
			</div>

			{Array.isArray(feedback.tips) && feedback.tips.length > 0 && (
				<ul className="interview-tips posture-tips-list">
					{feedback.tips.map((tip, index) => (
						<li key={`${tip}-${index}`}>{tip}</li>
					))}
				</ul>
			)}

			<details className="posture-debug-panel">
				<summary>Camera diagnostics</summary>
				<div className="interview-info posture-debug-grid">
					<div className="info-item">
						<span className="info-label">Confidence</span>
						<span className="info-value">{formatMetric(debug.confidence, "%")}</span>
					</div>
					<div className="info-item">
						<span className="info-label">Brightness</span>
						<span className="info-value">{formatMetric(debug.avgBrightness)}</span>
					</div>
					<div className="info-item">
						<span className="info-label">Center ratio</span>
						<span className="info-value">{formatMetric(debug.centerEdgeRatio)}</span>
					</div>
					<div className="info-item">
						<span className="info-label">Balance</span>
						<span className="info-value">{formatMetric(debug.horizontalBalance)}</span>
					</div>
					<div className="info-item">
						<span className="info-label">Face detected</span>
						<span className="info-value">{debug.faceDetected ? "Yes" : "No"}</span>
					</div>
					<div className="info-item">
						<span className="info-label">Face size</span>
						<span className="info-value">{formatMetric(debug.faceSize)}</span>
					</div>
				</div>
			</details>

			<details className="posture-tuning-panel">
				<summary>Thresholds</summary>
				<div className="config-grid">
					<div className="config-item">
						<label htmlFor="postureConfidenceMin">Min confidence</label>
						<input id="postureConfidenceMin" type="number" value={tuning.confidenceMin ?? 62} onChange={handleNumberChange("confidenceMin")} />
					</div>
					<div className="config-item">
						<label htmlFor="postureCenterMin">Center min</label>
						<input id="postureCenterMin" type="number" step="0.01" value={tuning.centerMin ?? 0.16} onChange={handleNumberChange("centerMin")} />
					</div>
					<div className="config-item">
						<label htmlFor="postureBrightnessMin">Brightness min</label>
						<input id="postureBrightnessMin" type="number" value={tuning.brightnessMin ?? 35} onChange={handleNumberChange("brightnessMin")} />
					</div>
					<div className="config-item">
						<label htmlFor="postureBrightnessMax">Brightness max</label>
						<input id="postureBrightnessMax" type="number" value={tuning.brightnessMax ?? 235} onChange={handleNumberChange("brightnessMax")} />
					</div>
				</div>
				<button type="button" className="new-interview-btn" onClick={onResetPostureTuning}>
					Reset thresholds
				</button>
			</details>

			<video
				ref={postureVideoRef}
				autoPlay
				muted
				playsInline
				style={{ width: "100%", maxHeight: 180, borderRadius: 12, background: "#0f172a", marginTop: 12 }}
			/>
		</section>
	);
}

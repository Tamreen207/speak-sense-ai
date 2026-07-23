export const formatTime = (seconds) => {
	const safeSeconds = Math.max(0, Number(seconds) || 0);
	const mins = Math.floor(safeSeconds / 60);
	const secs = safeSeconds % 60;
	return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const deriveSpeechTip = (wordsPerMinute = 0, fillerCount = 0, pauseCount = 0) => {
	const wpm = Number(wordsPerMinute) || 0;
	const fillers = Number(fillerCount) || 0;
	const pauses = Number(pauseCount) || 0;

	if (fillers >= 8) {
		return "Cut down on filler words and pause briefly before key ideas.";
	}

	if (wpm > 165) {
		return "Slow down slightly so your answers sound more deliberate.";
	}

	if (wpm > 0 && wpm < 90) {
		return "Try speaking a little faster to keep your answer engaging.";
	}

	if (pauses >= 6) {
		return "Use fewer long pauses by outlining your answer before you speak.";
	}

	return "Good pace overall. Keep your answers structured and confident.";
};

import React from "react";

class SilentErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error) {
		if (process.env.NODE_ENV !== "production") {
			// Keep the interview UI resilient without crashing the whole page.
			// eslint-disable-next-line no-console
			console.error("SilentErrorBoundary caught an error:", error);
		}
	}

	render() {
		if (this.state.hasError) {
			return this.props.fallback ?? null;
		}

		return this.props.children ?? null;
	}
}

export default SilentErrorBoundary;

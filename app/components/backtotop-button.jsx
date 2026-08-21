"use client";

export default function BackToTopButton() {
	return (
		<button
			id="top-of-page"
			onClick={() => window.scrollTo({ top: 5, behavior: "smooth" })}
			className="text-sand"
		>
			Back to top
		</button>
	);
}

"use client";
import { Button } from "@nextui-org/button";

export default function BackToTopButton() {
	return (
		<Button
			id="top-of-page"
			onClick={() => window.scrollTo({ top: 5, behavior: "smooth" })}
			className="text-sand"
			size="lg"
		>
			Back to top
		</Button>
	);
}

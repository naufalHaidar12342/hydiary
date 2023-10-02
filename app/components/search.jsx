"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Search() {
	const router = useRouter();
	const [texts, setTexts] = useState("");
	const [query] = useDebounce(texts, 500);
	useEffect(() => {
		router.push(`/stories?search=${query}`);

		// return () => {
		// 	"";
		// };
	}, [query, router]);

	return (
		<div>
			<input
				value={texts}
				onChange={(e) => setTexts(e.target.value)}
				type="text"
				placeholder="Search for stories title here"
				className="input-lg lg:input input-bordered w-full max-w-xs"
			/>
		</div>
	);
}

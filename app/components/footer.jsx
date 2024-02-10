import { caveat } from "@/libraries/fonts";
import { Link } from "@nextui-org/link";
export default function Footer() {
	return (
		<footer
			className={`${caveat.className} flex flex-col justify-center items-center text-3xl gap-2 p-10 bottom-0 left-0 right-0 isolate z-10`}
		>
			<span>@2023.</span>
			<div>
				made by{" "}
				<a
					href="https://github.com/naufalHaidar12342"
					target="_blank"
					rel="noopener noreferrer"
					className="underline-link-animation"
				>
					me
				</a>
				, co-authored by{" "}
				<a
					href="https://github.com/strijunk"
					target="_blank"
					rel="noopener noreferrer"
					className="underline-link-animation"
				>
					strijunk
				</a>
			</div>
		</footer>
	);
}

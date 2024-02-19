import { caveat } from "@/libraries/fonts";
import { Link } from "@nextui-org/link";
export default function Footer() {
	return (
		<footer
			className={`${caveat.className} flex flex-col justify-end items-center text-3xl gap-2 p-10 z-0`}
		>
			<span>@2023.</span>
			<div>
				co-authored by{" "}
				<Link
					href="/about/co-authors/strijunk"
					target="_blank"
					className="underline-link-animation text-3xl text-white"
				>
					strijunk
				</Link>{" "}
				and{" "}
				<Link
					href="/about/co-authors/devardha"
					target="_blank"
					className="underline-link-animation text-3xl text-white"
				>
					devardha
				</Link>
			</div>
		</footer>
	);
}

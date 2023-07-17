import Link from "next/link";

export default function Footer() {
	return (
		<footer className="footer p-10 bg-dark-slate-gray text-white">
			<div>
				<p>🗒️A blog by Naufal Haidar ©2023</p>
				<p>
					Special thanks to{" "}
					<a
						href="https://github.com/devardha"
						rel="noreferrer"
						target="_blank"
						className="link link-hover"
					>
						{""}devardha
					</a>
				</p>
			</div>
			<div>
				<span className="footer-title opacity-100">Contacts</span>
				<a
					className="link link-hover py-7 lg:py-0"
					href="https://naufalhaidarr-qit1952.slack.com/team/U055EA48N6A"
					rel={"noreferrer"}
					target="_blank"
				>
					Slack
				</a>
				<a
					className="link link-hover opacity-100 py-7 lg:py-0"
					href="https://t.me/heydar12342"
					rel="noreferrer"
					target="_blank"
				>
					Telegram
				</a>
				<a
					className="link link-hover opacity-100 py-7 lg:py-0"
					href="mailto:naufalhaidar12342@gmail.com"
					rel="noreferrer"
					target="_blank"
				>
					E-mail
				</a>
			</div>
			<div>
				<span className="footer-title opacity-100 py-7 lg:py-0">Legal</span>
				<Link
					href={"/legals/privacy-policy"}
					className="link link-hover"
					target="_blank"
					rel="noreferrer"
				>
					Privacy policy
				</Link>
			</div>
		</footer>
	);
}

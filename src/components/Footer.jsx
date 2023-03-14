import { FaTelegramPlane } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
export default function Footer() {
	return (
		<footer className="footer footer-center p-10 bg-middle-blue-green text-black bottom-0 ">
			<div className="font-semibold text-2xl">
				<p>
					<i>naufalHaidar12342</i>
				</p>
				<p>Built in 2023</p>
				<p>⚡ Powered by Vercel + Hygraph</p>
			</div>
			<div>
				<div className="grid grid-flow-col gap-4">
					<div className="tooltip" data-tip="Email me">
						<a
							href="mailto:naufalhaidar12342@gmail.com"
							target={"_blank"}
							rel={"noreferrer"}
							aria-label="Email button"
						>
							<SiGmail className="h-6 w-6 fill-current" />
						</a>
					</div>
					<div className="tooltip" data-tip="DM me at Telegram">
						<a
							href="https://t.me/heydar12342"
							target={"_blank"}
							rel={"noreferrer"}
							aria-label="Email button"
						>
							<FaTelegramPlane className="h-6 w-6 fill-current" />
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}

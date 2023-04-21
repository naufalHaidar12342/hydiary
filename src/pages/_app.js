import "@/styles/globals.css";
import { Poppins } from "@next/font/google";
import { Analytics } from "@vercel/analytics/react";
const poppins = Poppins({
	weight: ["500", "600"],
	subsets: ["latin"],
});
export default function App({ Component, pageProps }) {
	return (
		<main className={poppins.className}>
			<Component {...pageProps} />
			<Analytics />
		</main>
	);
}

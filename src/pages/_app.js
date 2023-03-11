import "@/styles/globals.css";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
	weight: ["500", "600"],
	subsets: ["latin"],
});
export default function App({ Component, pageProps }) {
	return (
		<main className={poppins.className}>
			<Component {...pageProps} />
		</main>
	);
}

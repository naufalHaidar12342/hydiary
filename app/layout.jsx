import { Akshar } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import Header from "@components/header";
import Footer from "@components/footer";
import "./globals.css";

const akshar = Akshar({
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500", "600"],
});

export default function Layout({ children }) {
	return (
		<html lang="en" className={akshar.className}>
			<body>
				<Header />
				{children}
				<Analytics />
				<Footer />
			</body>
		</html>
	);
}

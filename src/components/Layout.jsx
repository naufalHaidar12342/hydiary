import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

export default function Layout({ children, pageTitle = "naufalHaidar12342" }) {
	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta
					name="description"
					content="The naufalHaidar12342 personal blog"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<NavigationBar />
			<main className="relative"></main>
			{children}
			<Footer />
		</>
	);
}

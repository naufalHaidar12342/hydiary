import Head from "next/head";
import Link from "next/link";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

export default function Layout({ children, pageTitle = "naufalHaidar12342" }) {
	return (
		<div>
			<Head>
				<title>{pageTitle}</title>
				<meta
					name="description"
					content="The naufalHaidar12342 personal blog"
				/>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
				<meta property="og:image" content="naufalhaidar12342.cyou/api/og" />
				<meta property="og:title" content="naufalHaidar12342 blog" />
				<meta
					property="og:description"
					content="Personal blog of Naufal Haidar (naufalHaidar12342)"
				/>
				<meta
					property="twitter:image"
					content="/nextjs-logotype-dark-background.png"
				/>
				<meta property="twitter:card" content="summary_large_image" />
				<meta property="twitter:title" content="Twitter link preview title" />
				<meta
					property="twitter:description"
					content="Twitter link preview description"
				/>
			</Head>
			<NavigationBar />
			{children}
			<Footer />
		</div>
	);
}

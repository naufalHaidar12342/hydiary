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
				<meta
					property="og:image"
					content="*.naufalhaidar12342.cyou/api/og?title=naufalHaidar12342"
				></meta>
			</Head>
			<NavigationBar />
			{children}
			<Footer />
		</div>
	);
}

import Head from "next/head";
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
					content="https://media.graphassets.com/gOl4JN4qQX62y0LPUGRR"
				/>
				<meta property="og:title" content="naufalHaidar12342 blog" />
				<meta
					property="og:description"
					content="Personal blog of Naufal Haidar (naufalHaidar12342)"
				/>
				<meta
					property="twitter:image"
					content="https://media.graphassets.com/gOl4JN4qQX62y0LPUGRR"
				/>
				<meta
					property="twitter:card"
					content="The logo of Next.js, backbone of this website"
				/>
				<meta property="twitter:title" content="naufalHaidar12342" />
				<meta
					property="twitter:description"
					content="Visit Naufal Haidar's blog: naufalhaidar12342.cyou"
				/>
			</Head>
			<NavigationBar />
			{children}
			<Footer />
		</div>
	);
}

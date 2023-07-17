import Head from "next/head";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

export default function Layout({
	children,
	pageTitle = "🌏 naufalHaidar12342 blog",
	thumbnail = "https://media.graphassets.com/gOl4JN4qQX62y0LPUGRR",
	articleDesc = "Feel free to read my blog posts",
}) {
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
				<meta property="og:image" content={thumbnail} />
				<meta property="og:title" content={pageTitle} />
				<meta property="og:description" content={articleDesc} />
				<meta property="og:url" content="https://naufalhaidar12342.cyou" />
				<meta property="twitter:image" content={thumbnail} />
				<meta
					property="twitter:card"
					content="The logo of Next.js, backbone of this website"
				/>
				<meta property="twitter:title" content={pageTitle} />
				<meta property="twitter:description" content={articleDesc} />
			</Head>
			<NavigationBar />
			{children}
			<Footer />
		</div>
	);
}

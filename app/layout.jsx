export async function generateMetadata({}) {
	return {
		openGraph: {},
	};
}

export default function Layout({ children }) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}

export default function robots() {
	return {
		rules: {
			userAgents: "*",
			allow: ["/", "/api/og/*"],
		},
		sitemap: "https://naufalhaidar12342.cyou/sitemap.xml",
	};
}

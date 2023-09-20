export default function sitemap() {
	return [
		{
			url: "https://naufalhaidar12342.cyou/",
			lastModified: new Date(),
			changeFrequency: "always",
			priority: 1,
		},
		{
			url: "https://naufalhaidar12342.cyou/stories",
			lastModified: new Date(),
			changeFrequency: "daily",
			priority: 0.8,
		},
		{
			url: "https://naufalhaidar12342.cyou/projects",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.5,
		},
		{
			url: "https://naufalhaidar12342.cyou/about",
			lastModified: new Date(),
			changeFrequency: "weekly",
			priority: 0.3,
		},
	];
}

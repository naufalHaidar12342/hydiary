export async function getStaticProps() {
	const client = new GraphQLClient(
		"https://ap-southeast-2.cdn.hygraph.com/content/cl7gawkjl7suf01uhdrd42szp/master"
	);
	const { posts } = await client.request(`
	{
		posts(orderBy: createdAt_DESC) {
			id
			title
			publishedAt
			createdAt
			slug
			tags
			excerpt
			coverImage {
				url
			}
		}
		
	}`);

	return {
		props: {
			posts,
		},
	};
}
{
	posts.map((blogposts, key) => <ArticleCard allPost={blogposts} key={key} />);
}

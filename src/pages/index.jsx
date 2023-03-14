import ArticleCard from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import { GraphQLClient } from "graphql-request";

export default function Home({ posts }) {
	return (
		<Layout pageTitle="Home">
			<div className="flex flex-col justify-center items-center px-4 py-4">
				<h2 className="text-3xl font-bold my-3">Latest posts</h2>
				{posts.map((blogPosts, key) => (
					<div key={key}>
						<ArticleCard allPost={blogPosts} />
					</div>
				))}
			</div>
		</Layout>
	);
}
export async function getStaticProps() {
	const client = new GraphQLClient(process.env.HYGRAPH_HIGH_PERFORMANCE_API);
	console.log(process.env.HYGRAPH_HIGH_PERFORMANCE_API);
	const { posts } = await client.request(`
	{
		posts(orderBy: publishedAt_DESC, first:3) {
			id
			title
			publishedAt
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

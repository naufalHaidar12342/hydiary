import ArticleCard from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import { GraphQLClient } from "graphql-request";
export default function AllPosts({ posts }) {
	return (
		<Layout pageTitle="All Posts">
			<div className="flex flex-col justify-center items-center">
				<h2 className="text-3xl my-4 p-4">All Posts</h2>
				{posts.map((blogposts, key) => (
					<ArticleCard allPost={blogposts} key={key} />
				))}
			</div>
		</Layout>
	);
}
export async function getStaticProps() {
	const API =
		"https://ap-southeast-2.cdn.hygraph.com/content/cl7gawkjl7suf01uhdrd42szp/master";
	const client = new GraphQLClient(API);
	const { posts } = await client.request(`
	{
		posts(orderBy: publishedAt_DESC) {
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

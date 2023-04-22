import ArticleCard from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import { GraphQLClient } from "graphql-request";
export default function AllPosts({ posts }) {
	return (
		<Layout pageTitle="All Posts">
			<div className="flex flex-col justify-center items-center p-6">
				<h2 className="text-3xl my-4 p-4">All Posts</h2>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
					{posts.map((blogposts, key) => (
						<ArticleCard allPost={blogposts} key={key} />
					))}
				</div>
			</div>
		</Layout>
	);
}
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

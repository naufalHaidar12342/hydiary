import ArticleCard from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import axios from "axios";
import { GraphQLClient } from "graphql-request";
import useSWR from "swr";
export default function Home({ posts }) {
	return (
		<Layout pageTitle="Home">
			<div className="flex flex-col justify-center items-center lg:px-32 px-6 py-4">
				<h2 className="text-3xl font-bold my-3">Latest posts</h2>
				<div className="mx-auto ">
					{posts.map((blogPosts, key) => (
						<ArticleCard allPost={blogPosts} key={key} />
					))}
				</div>
			</div>
		</Layout>
	);
}
export async function getStaticProps() {
	const client = new GraphQLClient(
		"https://api-ap-southeast-2.hygraph.com/v2/cl7gawkjl7suf01uhdrd42szp/master"
	);
	const { posts } = await client.request(`
	{
		posts(orderBy: createdAt_DESC, first:2) {
			id
			title
			createdAt
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

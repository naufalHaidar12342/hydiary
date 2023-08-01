import ArticleCard from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import SkeletonCard from "@/components/SkeletonCard";
import { GraphQLClient } from "graphql-request";
import { useEffect, useState } from "react";

export default function Home({ posts }) {
	// let homepagePostLimit = Array(2).fill(0);
	// const [loading, setLoading] = useState(true);
	// useEffect(() => {
	// 	let timer;
	// 	if (posts) {
	// 		timer = setTimeout(() => {
	// 			setLoading(false);
	// 		}, 1000);
	// 	}
	// 	return clearTimeout(timer);
	// }, []);
	return (
		<Layout pageTitle="Home">
			<div className="flex flex-col justify-center items-center lg:px-32 px-6 py-4">
				<h2 className="text-3xl font-bold my-3">Latest posts</h2>
				<div className="mx-auto ">
					{posts.map((blogPost, key) => (
						<ArticleCard key={key} allPost={blogPost} />
					))}
				</div>
			</div>
		</Layout>
	);
}
export async function getStaticProps() {
	const client = new GraphQLClient(process.env.HYGRAPH_HIPERF_API);
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

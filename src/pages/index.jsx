import ArticleCard from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import axios from "axios";
import { GraphQLClient } from "graphql-request";
import useSWR from "swr";
export default function Home({ posts, fact }) {
	const factsApiKey = "4vrsSpflFp5dS0BRVR217A==ZhamzLP2abjU7Inl";
	const url = "https://api.apininjas.com/v1/facts";
	const fetcher = (url) => axios.get(url).then((res) => res.data);
	const { data, error, isLoading } = useSWR(
		url,
		{
			headers: { "x-api-key": factsApiKey },
		},
		fetcher
	);
	console.log("data of facts=", data);
	if (error) {
		console.log("error fetching facts=", error);
		return (
			<div className="alert alert-error shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="stroke-current flex-shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>Error getting interesting facts. Reason: {error}.</span>
				</div>
			</div>
		);
	} else if (isLoading) {
		return (
			<div className="alert shadow-lg">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-info flex-shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<span>Loading interesting facts for you! Hang on!</span>
				</div>
			</div>
		);
	}
	return (
		<Layout pageTitle="Home">
			<div className="flex flex-col justify-center items-center px-4 py-4">
				<h2 className="text-3xl font-bold my-3">Latest posts</h2>
				<div className="mx-auto">
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

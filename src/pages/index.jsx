import ArticleCard from "@/components/ArticleCard";
import Layout from "@/components/Layout";
import axios from "axios";
import { GraphQLClient } from "graphql-request";

export default function Home({ posts, fact }) {
	return (
		<Layout pageTitle="Home">
			<div className="flex flex-col justify-center items-center px-4 py-4">
				<h2 className="text-3xl font-bold my-3">Latest posts</h2>
				{posts.map((blogPosts, key) => (
					<ArticleCard allPost={blogPosts} key={key} />
				))}
				<div className="alert lg:w-1/2">
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
						<div>
							<h3 className="font-bold">Did you know ?</h3>
							<div className="text-xs">
								Lorem, ipsum dolor sit amet consectetur adipisicing elit.
								Repellendus, nihil qui quisquam vero eum, mollitia quod, nemo
								dolores similique soluta iusto quam necessitatibus commodi a.
								Nulla iusto illum dolorem fuga.
							</div>
						</div>
					</div>
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
		posts(orderBy: createdAt_DESC, first:3) {
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
	// fetching random facts from Facts API from API Ninja
	const factsApiKey = "4vrsSpflFp5dS0BRVR217A==ZhamzLP2abjU7Inl";
	const headers = {
		"x-api-key": factsApiKey,
	};
	let fact = null;

	try {
		const factsResponse = await axios.get(
			"https://api.api-ninjas.com/v1/facts",
			{
				headers,
			}
		);
		fact = factsResponse.data.data;
	} catch (error) {
		console.log("Error fetching facts", error);
	}

	return {
		props: {
			posts,
			fact: JSON.stringify(fact),
		},
	};
}

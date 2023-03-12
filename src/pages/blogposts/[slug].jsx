import { GraphQLClient } from "graphql-request";

export default function Posts({ postSelected }) {
	third;
}
export async function getStaticPaths() {
	const API =
		"https://ap-southeast-2.cdn.hygraph.com/content/cl7gawkjl7suf01uhdrd42szp/master";
	const client = new GraphQLClient(API);
	const { posts } = await client.request(`{
		posts(orderBy: id_ASC) {
			slug
		}
	}`);

	const paths = posts.map((item) => {
		return {
			params: {
				slug: item.slug,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
}
export async function getServerSideProps({}) {}

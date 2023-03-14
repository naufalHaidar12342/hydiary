import Layout from "@/components/Layout";
import { format, parseISO } from "date-fns";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Posts({ post }) {
	return (
		<Layout pageTitle={post.title}>
			<style global jsx>{`
				.markdown-hygraph h3 {
					font-weight: 600;
					font-size: 1.5rem;
					line-heigh: 2rem;
					margin-bottom: 20px;
				}
				.markdown-hygraph h4 {
					font-weight: 600;
					font-size: 1.4rem;
					line-heigh: 2rem;
					margin-bottom: 20px;
				}

				.markdown-hygraph p {
					margin-bottom: 16px;
					font-size: 16px;
					line-height: 24px;
				}

				.markdown-hygraph img {
					height: 20rem;
					margin-left: auto;
					margin-right: auto;
					max-width: 100%;
				}

				.markdown-hygraph a {
					cursor: pointer;
					color: #478978;
					text-decoration: underline;
				}
				.markdown-hygraph blockquote {
					font-size: 16px;
					margin-top: 10px;
					margin-bottom: 10px;
					margin-left: 30px;
					padding-left: 15px;
					border-left: 3px solid #ccc;
				}
				.markdown-hygraph code {
					color: #000000;
					background-color: rgb(208, 213, 231);
					border-radius: 4px;
					border: 1px solid rgb(208, 213, 231);
					padding: 4px;
				}
				.markdown-hygraph ul {
					display: block;
					list-style-type: disc;
					margin-block-start: 1em;
					margin-block-end: 1em;
					margin-inline-start: 0px;
					margin-inline-end: 0px;
					padding-inline-start: 40px;
				}
			`}</style>
			<div className="min-h-screen max-w-screen-lg mx-auto">
				<div className="flex flex-col justify-center items-center">
					<h2 className="font-bold text-4xl p-5 text-center">{post.title}</h2>
					<ReactMarkdown className="markdown-hygraph p-4">
						{post.content.markdown}
					</ReactMarkdown>
					<div className="flex flex-col justify-center items-center py-4">
						<div
							className="w-36 h-36 relative"
							aria-label="Photo of article writer"
						>
							<Image
								src={post.author.picture.url}
								className={"rounded-full"}
								fill
								style={{ objectFit: "cover" }}
								alt="Photo of article writer"
							/>
						</div>
						<div className="flex flex-col justify-center items-center p-3">
							<h4 className="font-light">Author: {post.author.name}</h4>
							<h4 className="font-light">
								Post updated: {format(new Date(post.updatedAt), "dd MMMM yyyy")}
							</h4>
						</div>
						<Link
							href={"/"}
							className="btn bg-viridian border-none w-full text-white hover:bg-uranian-blue hover:text-black"
						>
							All post
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
export async function getStaticPaths() {
	const client = new GraphQLClient(
		"https://ap-southeast-2.cdn.hygraph.com/content/cl7gawkjl7suf01uhdrd42szp/master"
	);
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
export async function getStaticProps({ params: { slug } }) {
	const client = new GraphQLClient(
		"https://ap-southeast-2.cdn.hygraph.com/content/cl7gawkjl7suf01uhdrd42szp/master"
	);
	const { post } = await client.request(`{
		post(where: { slug: "${slug}" }) {
			title
			createdAt
			publishedAt
			updatedAt
			slug
			tags
			excerpt
			coverImage {
				url
			}
			content {
				markdown
			}
			author {
				name
				picture {
					url
				}
			}
		}
	}`);
	return {
		props: {
			post,
		},
	};
}

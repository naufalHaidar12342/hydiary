import Layout from "@/components/Layout";
import { format } from "date-fns";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function Posts({ post }) {
	const disqusWebsiteShortname = "naufalhaidar12342-cyou";

	return (
		<Layout pageTitle={post.title}>
			<style global jsx>{`
				.markdown-hygraph h3 {
					font-weight: 600;
					font-size: 1.5rem;
					line-height: 2rem;
					margin-bottom: 20px;
				}

				.markdown-hygraph h4 {
					font-weight: 600;
					font-size: 1.4rem;
					line-height: 2rem;
					margin-bottom: 20px;
				}

				.markdown-hygraph h5 {
					font-weight: 500;
					font-size: 1.2rem;
					line-height: 0.5rem;
					margin-bottom: 20px;
					text-align: center;
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
					min-width: 100%;
					max-width: 100%;
					border-radius: 1rem;
					object-fit: cover;
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
				#thread__container > * {
				}
			`}</style>
			<div className="min-h-screen max-w-screen-lg mx-auto">
				<div className="flex flex-col justify-center items-center">
					<h2 className="font-bold text-4xl p-5 text-center">{post.title}</h2>
					<div className="w-full h-96 relative">
						<Image
							src={post.coverImage.url}
							fill
							priority
							className="lg:rounded-2xl"
							alt="Cover image of post"
							style={{ objectFit: "cover" }}
						/>
					</div>
					<span className="text-xl text-center p-2">
						{post.coverImageCredits}
					</span>
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
								Posted at {format(new Date(post.createdAt), "dd MMMM yyyy")}
							</h4>
						</div>
						<Link
							href={"/blogposts/all-post"}
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
		"https://api-ap-southeast-2.hygraph.com/v2/cl7gawkjl7suf01uhdrd42szp/master"
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
		"https://api-ap-southeast-2.hygraph.com/v2/cl7gawkjl7suf01uhdrd42szp/master"
	);
	const { post } = await client.request(`{
		post(where: { slug: "${slug}" }) {
			id
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
			coverImageCredits
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

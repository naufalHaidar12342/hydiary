import Layout from "@/components/Layout";
import { format } from "date-fns";
import { GraphQLClient } from "graphql-request";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Giscus from "@giscus/react";

export default function Posts({ post }) {
	return (
		<Layout
			pageTitle={post.title}
			thumbnail={post.coverImage.url}
			articleDesc={post.excerpt}
		>
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
					line-height: 2rem;
					margin-bottom: 10px;
					text-align: center;
				}

				.markdown-hygraph p {
					margin-bottom: 16px;
					font-size: 16px;
					line-height: 24px;
				}

				.markdown-hygraph img {
					height: 100%;
					margin-left: auto;
					margin-right: auto;
					min-width: 100%;
					max-width: 100%;
					border-radius: 1rem;
					object-fit: cover;
				}

				.markdown-hygraph a {
					cursor: pointer;
					color: #367564;
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
			<div className="min-h-screen max-w-screen-lg mx-auto px-8">
				<div className="flex flex-col justify-center items-center">
					<h2 className="font-bold text-4xl p-5 text-center ">{post.title}</h2>
					<div className="h-96 lg:h-[600px] min-w-full max-w-full relative">
						<Image
							src={post.coverImage.url}
							fill
							priority
							className="lg:rounded-2xl"
							alt="Cover image of post"
							style={{ objectFit: "cover" }}
							sizes="(max-width: 768px) 100vw"
							placeholder="blur"
							blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPUMmCrBwABzQDh9QSszwAAAABJRU5ErkJggg=="
						/>
					</div>
					<ReactMarkdown className="markdown-hygraph text-xl text-center p-2 italic">
						{post.coverImageCredits}
					</ReactMarkdown>
					<div className="flex gap-4 py-4">
						<div className="">
							<div
								className="w-24 h-24 relative"
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
						</div>
						<div className="flex flex-col justify-center content-center">
							<h3 className="font-light text-xl">{post.author.name}</h3>
							<h3 className="font-light text-xl">
								{format(new Date(post.createdAt), "MMMM dd, yyyy hh:mm")}
							</h3>
						</div>
					</div>
					<ReactMarkdown className="markdown-hygraph p-4 ">
						{post.content.markdown}
					</ReactMarkdown>
					<div className="flex flex-col justify-start content-center pt-5 px-4 dark:text-slate-200 text-black">
						<p className="text-xl">
							Thanks for reading this post! Feel free to comment below using
							<a
								href="https://github.com/giscus/giscus"
								target="_blank"
								rel="noreferrer"
								className="link link-hover text-amazon-green"
							>
								{""} giscus
							</a>
							, an open-source comment system that use GitHub Discussion API
							that is ads-free and do not track you. Keep in mind, you still
							required to log in to GitHub to comment.
						</p>
						<div className="pt-4">
							<p className="text-lg">
								Just heard about GitHub? Hope these guides below could help you!
							</p>
							<ul
								className="block list-disc"
								style={{
									marginInlineStart: "0px",
									marginInlineEnd: "0px",
									marginBlockStart: "1em",
									marginBlockEnd: "1em",
									paddingInlineStart: "40px",
								}}
							>
								<li>
									What is GitHub?:{" "}
									<a
										href="https://www.youtube.com/watch?v=tRZGeaHPoaw&t=2006s"
										target="_blank"
										rel="noreferrer"
										className="dark:text-white text-black font-bold link link-hover"
									>
										Git and GitHub for Beginners Tutorial - Kevin Stratvert
									</a>
									{""} (P.S: the explanation start at minute 32:42)
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="py-5">
					<Giscus
						term="Hello! Please keep the comment section civil and respectful."
						category="General"
						mapping="title"
						repo="naufalHaidar12342/my-personal-blog-nextjs"
						repoId="R_kgDOI6RB1w"
						categoryId="DIC_kwDOI6RB184CXSMO"
						inputPosition="top"
						reactionsEnabled="1"
						theme={"preferred_color_scheme"}
						loading="lazy"
					/>
				</div>
			</div>
		</Layout>
	);
}
export async function getStaticPaths() {
	const client = new GraphQLClient(process.env.HYGRAPH_HIPERF_API);
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

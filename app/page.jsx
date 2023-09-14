import Image from "next/image";
import Link from "next/link";

export async function getLatestPost() {
	const latestPost = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query LatestPost{
				posts(orderBy: createdAt_DESC, first:1) {
					title
					slug
					createdAt
					excerpt
					coverImage {
						url
					}
				}
			}`,
		}),
	}).then((res) => res.json());
	return latestPost.data.posts;
}
export async function getPostsByTag() {}

export default async function Home() {
	const latestPostContent = await getLatestPost();

	return (
		<div className="flex flex-col justify-center items-center lg:px-[120px] px-6">
			<div className="hero min-h-screen bg-base-100 dark:text-slate-200 text-black">
				<div className="hero-content flex-col lg:flex-row-reverse">
					{latestPostContent.map((post, key) => (
						<div key={key}>
							<div className="w-72 h-80 lg:w-[512px] lg:h-[400px] relative">
								<Image
									src={post.coverImage.url}
									className="rounded-lg shadow-2xl lg:mx-3 "
									style={{ objectFit: "cover" }}
									fill
									alt={`Cover image for "${post.title}"`}
									priority
								/>
							</div>
						</div>
					))}
					<div>
						{latestPostContent.map((post, key) => (
							<div key={key}>
								<Link href={``} className="text-4xl font-semibold">
									Latest story: {post.title}
								</Link>
								<p className="pt-4 font-normal text-2xl ">{post.createdAt}</p>
								<p className=" font-normal text-2xl ">{post.excerpt}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

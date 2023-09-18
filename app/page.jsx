import Image from "next/image";
import Link from "next/link";
import ISOTimeToHumanReadable from "./utilities/iso_time_to_jakarta_timezone";
import HygraphDateToReadableDate from "./utilities/hygraph_date_to_readable_date";

export const metadata = {
	title: "naufalHaidar12342",
	description: "Logging my stories, one at a time 📝",
	openGraph: {
		title: "naufalHaidar12342",
		description: "Logging my stories, one at a time 📝",
		url: "https://naufalhaidar12342.cyou/",
		siteName: "naufalHaidar12342",
	},
};

export async function getLatestPost() {
	const latestPost = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query LatestPost{
				posts(orderBy: date_DESC, first:1) {
					title
					slug
					date
					createdAt
					excerpt
					coverImage {
						url
					}
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((errors) => console.error(errors));
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
						<div key={key} className="">
							<div className="w-72 h-80 md:w-[512px] md:h-[400px] relative">
								<Image
									src={post.coverImage.url}
									className="rounded-lg shadow-2xl lg:mx-3 "
									style={{ objectFit: "cover" }}
									fill
									sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
									alt={`Cover image for "${post.title}"`}
									priority
								/>
							</div>
						</div>
					))}
					<div>
						{latestPostContent.map((post, key) => (
							<div key={key}>
								<Link
									href={`/stories/${post.slug}`}
									className="text-4xl font-semibold link link-hover text-dark-slate-gray dark:text-jet-stream"
								>
									Latest story: {post.title}
								</Link>
								<p className="pt-4 font-normal text-2xl ">
									{HygraphDateToReadableDate(post.date)}
								</p>
								<p className=" font-normal text-2xl ">{post.excerpt}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

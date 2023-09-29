import {
	DEFAULT_OGIMAGE_CREDITS,
	DEFAULT_OG_IMAGE,
} from "@/constants/default_ogimage";
import HygraphDateToReadableDate from "@/utilities/hygraph_date_to_readable_date";
import ISOTimeToHumanReadable from "@/utilities/iso_time_to_jakarta_timezone";
import Image from "next/image";
import Link from "next/link";
import { GiNotebook } from "react-icons/gi";

export async function generateMetadata() {
	return {
		title: "naufalHaidar12342",
		description: "Logging my stories, one at a time 📝",
		openGraph: {
			title: "Story of nh12342 📝",
			description: `Read all stories of nh12342`,
			url: `https://naufalhaidar12342.cyou/stories`,
			siteName: "naufalHaidar12342",
			images: [
				{
					url: DEFAULT_OG_IMAGE,
					width: 1200,
					height: 630,
					alt: `${DEFAULT_OGIMAGE_CREDITS}`,
				},
			],
		},
	};
}
export async function getStories(page = 1, limitContent = 6) {
	const skip = (page - 1) * limitContent;
	const fetchStories = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next: { revalidate: 120 },
		body: JSON.stringify({
			query: `query StoriesWithPagination{
				posts(first: ${limitContent}, skip: ${skip}, orderBy: date_DESC) {
					title
					excerpt
					date
					createdAt
					slug
					coverImage {
						url
					}
					postAttribution {
						attributionMarkdown
						attributionImage {
							url
						}
					}
					tags
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((err) => console.error(err));
	return fetchStories.data.posts;
}

export default async function Stories({ searchParams }) {
	const page =
		typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
	const limit =
		typeof searchParams.limit === "string" ? Number(searchParams.limit) : 6;
	const stories = await getStories(page, limit);
	return (
		<div className="min-h-screen flex flex-col justify-center items-center p-6">
			<h2 className="text-3xl my-4 p-4">
				<GiNotebook className="inline-flex mr-2 dark:text-jet-stream text-dark-slate-gray" />
				Stories
			</h2>

			{/* pagination (using prev and next button) */}
			<div className="join">
				<Link
					href={`/stories?page=${page > 1 ? page - 1 : 1}`}
					className="join-item btn normal-case"
				>
					Previous page
				</Link>
				<button className="join-item btn normal-case">Page {page}</button>
				<Link
					href={`/stories?page=${page + 1}`}
					className="join-item btn normal-case"
				>
					Next page
				</Link>
			</div>

			{/* looping/mapping/get all member of array */}
			<div className="grid grid-cols-1 2xl:grid-cols-3 col-span-2 gap-6 2xl:gap-8 p-6">
				{stories.map((story) => (
					<div key={story.title} className="flex flex-col lg:flex-row">
						<div className="w-full h-48 2xl:h-60 relative">
							<Image
								className="rounded-xl"
								src={
									story.postAttribution.attributionImage.url !== null
										? story.postAttribution.attributionImage.url
										: story.coverImage.url
								}
								alt={`Cover image of ${story.title}`}
								fill
								sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
								style={{ objectFit: "cover" }}
								priority={true}
								placeholder="blur"
								blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMiI0tAgADjQF+ZG6tZQAAAABJRU5ErkJggg=="
							/>
						</div>
						<div className="w-full 2xl:w-1/2 py-5 lg:pl-6 lg:py-0">
							<Link
								href={`/stories/${story.slug}`}
								className="link link-hover font-medium text-lg text-dark-slate-gray dark:text-jet-stream"
							>
								{story.title}
							</Link>
							<p className="font-light">
								{HygraphDateToReadableDate(story.date)}
							</p>
							<div className="flex flex-col">
								{story.tags.map((tag) => (
									<div className="py-1" key={tag}>
										<div className="badge badge-info badge-md">{tag}</div>
									</div>
								))}
							</div>
							<p className="pt-2">{story.excerpt}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

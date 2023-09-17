import ISOTimeToHumanReadable from "@/utilities/iso_time_to_jakarta_timezone";
import Image from "next/image";
import Link from "next/link";
import { GiNotebook } from "react-icons/gi";
export const metadata = {
	title: "Stories",
	description: "Previously published stories.",
};

export async function getStories(page = 1, limitContent = 6) {
	const skip = (page - 1) * limitContent;
	const fetchStories = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query StoriesWithPagination{
				posts(first: ${limitContent}, skip: ${skip}, orderBy: createdAt_DESC) {
					title
					excerpt
					createdAt
					slug
					coverImage {
						url
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
								src={story.coverImage.url}
								alt={`Cover image of ${story.title}`}
								fill
								sizes="(max-width:768px) 100vw, (max-width:1280px) 50vw, 33vw"
								style={{ objectFit: "cover" }}
								priority={true}
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
								{ISOTimeToHumanReadable(story.createdAt)}
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

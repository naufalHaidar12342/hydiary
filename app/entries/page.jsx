import {
	DEFAULT_OGIMAGE_CREDITS,
	DEFAULT_OG_IMAGE,
} from "@/constants/default_ogimage";
import { metadataBaseUrl } from "@/libraries/metadata-base";
import { metadataRobotsRule } from "@/libraries/metadata-robots";
import { Button } from "@nextui-org/button";
import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "./hero-carousel";
import CustomPagination from "./custom-pagination";

export async function generateMetadata() {
	return {
		title: "Hydiary's Entries",
		description: "Heydar's diary (hey that's me!) ✍️",
		...metadataBaseUrl,
		...metadataRobotsRule,
		openGraph: {
			title: "Hydiary's Entries 📃",
			description: `Feel free to read all entries of my diary~`,
			url: `https://naufalhaidar12342.cyou/entries`,
			siteName: "Hydiary",
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

export async function getStories(page = 1, limitContent = 2) {
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
		typeof searchParams.limit === "string" ? Number(searchParams.limit) : 2;
	// const searchTitle=
	// 	typeof searchParams.search === "string" ? searchParams.search : undefined;

	/* stories and heroImages are fetched in parallel, each will have array value.
	also benefit us since this technique will reduce waterfall */
	const [stories, heroItems] = await Promise.all([
		getStories(page, limit),
		getStories(1, 3),
	]);
	// console.log("isi heroItems", heroItems);
	return (
		<div className="w-full min-h-screen isolate z-10">
			{/* half-height hero, with carousel/slider */}

			<HeroCarousel heroDatas={heroItems} />

			{/* looping/mapping/get all member of array */}
			<div className="flex flex-col max-w-screen-lg gap-4 px-5 py-10 mx-auto z-20">
				{stories.map((story) => (
					<div key={story.title} className="flex flex-col lg:flex-row gap-16">
						<div className="w-full h-[305px] relative">
							<Image
								className="rounded-xl"
								src={
									story.postAttribution.attributionImage.url !== null
										? story.postAttribution.attributionImage.url
										: story.coverImage.url
								}
								alt={`Cover image of ${story.title}`}
								fill
								sizes="(max-width:1280px) 80vw, 70vw"
								style={{ objectFit: "cover" }}
								priority={true}
								placeholder="blur"
								blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMiI0tAgADjQF+ZG6tZQAAAABJRU5ErkJggg=="
							/>
						</div>
						<div className="h-full w-full">
							<Link
								href={`/entries/${story.slug}`}
								className="font-semibold text-3xl underline-link-animation text-sand"
							>
								{story.title}
							</Link>
							<p className="py-8 font-normal text-xl">{story.excerpt}</p>
							<div className="flex flex-col gap-2 md:flex-row">
								{story.tags.map((tag) => (
									<div className="py-1" key={tag}>
										<Button
											size="lg"
											radius="sm"
											className="font-normal text-base bg-indigo-800"
										>
											{tag}
										</Button>
									</div>
								))}
							</div>
						</div>
					</div>
				))}
				{/* pagination (using prev and next button) */}
				<CustomPagination page={page} />
			</div>
		</div>
	);
}

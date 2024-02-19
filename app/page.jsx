import Image from "next/image";
import Link from "next/link";
import HygraphDateToReadableDate from "@/libraries/date-converter";
import {
	DEFAULT_OGIMAGE_CREDITS,
	DEFAULT_OG_IMAGE,
} from "@/constants/default_ogimage";
import { Divider } from "@nextui-org/divider";
import { metadataBaseUrl } from "./libraries/metadata-base";
import { metadataRobotsRule } from "./libraries/metadata-robots";
import { BASE_URL } from "./libraries/base-url";
import { metadataSiteName } from "./libraries/metadata-sitename";

export async function generateMetadata() {
	// next step: use the already fetched title, slug, and coverimage in Home
	// to avoid redundant fetch request
	const latestStory = await getLatestPost();
	const [storyTitle] = latestStory.map((post) => post.title);
	console.log("isi metadatabaseurl=", metadataBaseUrl.metadataBase);

	// console.log("isi title=", storyTitle);
	return {
		title: "Hydiary",
		description: "Heydar's diary (hey that's me!) ✍️",
		...metadataBaseUrl,
		...metadataRobotsRule,
		openGraph: {
			title: "Hydiary ✍️",
			description: `Latest entry in my diary: ${storyTitle}`,
			url: `${BASE_URL}`,
			...metadataSiteName,
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

export async function getLatestPost() {
	const latestPost = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		next: { revalidate: 100 },
		body: JSON.stringify({
			query: `query LatestPost{
				posts(orderBy: date_DESC, first:1) {
					title
					slug
					date
					createdAt
					excerpt
					postAttribution{
						attributionMarkdown
						attributionImage{
							url
						}
					}
				}
			}`,
		}),
	})
		.then((res) => res.json())
		.catch((errors) => console.error(errors));
	return latestPost.data.posts;
}

export default async function Home() {
	const [latestPostContent] = await getLatestPost();
	const entryImage = latestPostContent.postAttribution.attributionImage.url;
	const entryTitle = latestPostContent.title;
	const entrySlug = latestPostContent.slug;
	const entryDate = latestPostContent.date;
	const entryExcerpt = latestPostContent.excerpt;
	return (
		<div className="w-full min-h-screen isolate z-10">
			<div className="w-full h-full z-20">
				<Image
					src={entryImage}
					alt={`Cover image for one of Hydiary's entries, titled "${entryTitle}"`}
					style={{ objectFit: "cover" }}
					fill
					className="mix-blend-screen opacity-5 "
					priority={true}
				/>
			</div>

			<div className="flex max-w-[1100px] mx-auto py-16 md:py-32 items-center z-30 px-6">
				<div className="flex flex-col lg:flex-row-reverse items-center gap-3 lg:gap-10 z-40">
					{/* entry title, written date, and excerpt/summary */}
					<div className="flex flex-col z-50">
						<Link
							href={`/entries/${entrySlug}`}
							className="text-lime-300 text-4xl font-medium "
						>
							<span className="underline-link-animation">{entryTitle}</span>
						</Link>
						<div className="flex items-center gap-2">
							<span className="pt-5 pb-4 font-light text-xl">
								{HygraphDateToReadableDate(entryDate)}
							</span>
							<Divider className="h-1 w-1/2 bg-zinc-100 rounded-xl" />
						</div>
						<p className="text-neutral-50 text-2xl font-normal">
							{entryExcerpt}
						</p>
					</div>
					{/* smaller cover image with zinc border */}
					<div className="z-50 rounded-xl bg-gradient-to-r from-sand to-sand">
						<div className="h-64 w-80 relative">
							<Image
								src={entryImage}
								alt={`Cover image for one of Hydiary's entries, titled "${entryTitle}"`}
								style={{ objectFit: "cover" }}
								fill
								className="rounded-xl overflow-hidden"
								priority={true}
							/>
						</div>
					</div>
				</div>
			</div>
			<div className="flex max-w-5xl mx-auto z-30 px-6 bg-dark-gradient rounded-xl">
				<div className="flex flex-col z-40">
					<h3 className="text-lime-300 text-2xl font-medium">
						naufalhaidar12342 now become Hydiary 🎊
					</h3>
					<p className="pt-4">
						After going back to drawing board and implement the design together
						with strijunk, soon the domain of this website will be redirected to
						the new domain,
						<span className="underline-link-animation">hydiary.my.id</span>
					</p>
					<p className="pt-3">
						The current domain,
						<span className="underline-link-animation">
							naufalhaidar12342.cyou
						</span>
						, will stay as a redirect to the new domain.
					</p>
				</div>
			</div>
		</div>
	);
}

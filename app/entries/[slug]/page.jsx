import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { MdOutlineAutoStories } from "react-icons/md";
import HygraphDateToReadableDate from "@/libraries/date-converter";
import { BiLinkExternal } from "react-icons/bi";
import { FALLBACK_HYGRAPH_HIPERF_API } from "@/constants/fallback_hygraph";
import { metadataBaseUrl } from "@/libraries/metadata-base";
import { metadataRobotsRule } from "@/libraries/metadata-robots";
import { BASE_URL } from "@/libraries/base-url";

export async function generateMetadata({ params }) {
	const [fetchMetadataInfo] = await getSelectedStory(params.slug);
	const storyTitle = fetchMetadataInfo.title;
	const storyDescription = fetchMetadataInfo.excerpt;
	const storySlug = fetchMetadataInfo.slug;
	const storyCoverImage =
		fetchMetadataInfo.postAttribution.attributionImage.url;

	// console.log("story title=", storyTitle);
	// console.log("story desc=", storyDescription);
	return {
		title: `${storyTitle}`,
		description: `${storyDescription}`,
		...metadataBaseUrl,
		...metadataRobotsRule,
		openGraph: {
			title: storyTitle,
			description: storyDescription,
			url: `${BASE_URL}entries/${storySlug}`,
			images: [
				{
					url: storyCoverImage,
					width: 1200,
					height: 630,
					alt: `${storyTitle} cover image`,
				},
			],
		},
	};
}

export async function getSelectedStory(slug) {
	const selectedStory = await fetch(
		`${
			process.env.HYGRAPH_HIPERF_API === undefined
				? process.env.HYGRAPH_HIPERF_API
				: FALLBACK_HYGRAPH_HIPERF_API
		}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				query: `query SelectedStory{
				posts(where: {slug: "${slug}"}) {
					title
					slug
					excerpt
					tags
					coverImage {
						url
					}
					author {
						name
						picture {
							url
						}
					}
					date
					createdAt
					content{
						markdown
					}
					postAttribution {
						attributionMarkdown
						attributionImage {
							url
						}
					}
				}
			}`,
			}),
		}
	)
		.then((res) => res.json())
		.catch((errors) => console.error(errors));
	return selectedStory.data.posts;
}

const CustomMarkdownComponents = {
	/* override the default <p> tag that wraps <img> from markdown
	 */
	p: (paragraph) => {
		const { node } = paragraph;
		if (node.children[0].tagName === "img") {
			const image = node.children[0];
			const metaString = image.properties.alt;
			const imageAlt = metaString?.replace(/ *\{[^)]*\} */g, "");
			return (
				<div className="min-w-full h-60 2xl:h-[600px] relative my-5">
					<Image
						src={image.properties.src}
						alt={imageAlt}
						style={{ objectFit: "cover" }}
						className="rounded-xl"
						fill={true}
						sizes="(max-width: 1536px) 100vw, 80vw"
						placeholder="blur"
						blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMMiI0tAgADjQF+ZG6tZQAAAABJRU5ErkJggg=="
					/>
				</div>
			);
		}
		return <p className="text-xl 2xl:text-lg mb-4">{paragraph.children}</p>;
	},
	h3: (heading) => {
		return <h3 className="text-2xl font-semibold">{heading.children}</h3>;
	},
	a: (link) => {
		return (
			<a
				href={link.href}
				className="link link-hover text-dark-slate-gray dark:text-jet-stream font-medium"
				target="_blank"
				referrerPolicy="no-referrer"
			>
				{link.children}
				<BiLinkExternal className="inline-flex ml-1 dark:text-jet-stream text-dark-slate-gray" />
			</a>
		);
	},
	h5: (heading) => {
		return <h5 className="text-xl font-medium">{heading.children}</h5>;
	},
	ul: (list) => {
		return (
			<ul className="text-2xl 2xl:text-lg mx-6 list-disc list-inside">
				{list.children}
			</ul>
		);
	},
};

export default async function ReadStory({ params }) {
	const [entriesContents] = await getSelectedStory(params.slug);
	const entryImage = entriesContents.postAttribution.attributionImage.url;
	const entryTitle = entriesContents.title;
	const entryDate = HygraphDateToReadableDate(entriesContents.date);
	const entryImageCredit = entriesContents.postAttribution.attributionMarkdown;
	const entryContent = entriesContents.content.markdown;
	return (
		<div className="w-full min-h-screen isolate relative z-10">
			<div className="w-full h-[45vh] relative">
				<Image
					src={entryImage}
					alt={`Cover image of ${entryTitle}`}
					style={{ objectFit: "cover" }}
					fill
					priority={true}
					className="mix-blend-overlay opacity-35"
				/>
				<div className="w-full h-full flex flex-col items-center justify-end p-5">
					<h2 className="text-5xl font-medium text-lime-300 pt-2">
						{entryTitle}
					</h2>
					<div className="italic pt-2">
						<ReactMarkdown
							components={{
								a: (link) => {
									return (
										<a
											href={link.href}
											referrerPolicy="no-referrer"
											target="_blank"
											className="font-medium underline-link-animation"
										>
											{link.children}
										</a>
									);
								},
							}}
						>
							{entryImageCredit}
						</ReactMarkdown>
					</div>
				</div>
			</div>
			<div className="max-w-screen-xl min-h-full flex mx-auto relative z-20 p-5">
				<ReactMarkdown
					className="text-start pt-10"
					components={CustomMarkdownComponents}
				>
					{entryContent}
				</ReactMarkdown>
			</div>
		</div>
	);
}

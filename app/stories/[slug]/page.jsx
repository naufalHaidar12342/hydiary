import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export async function generateMetadata({ params }) {
	const fetchMetadatInfo = await getSelectedStory(params.slug);
	const pageTitle = fetchMetadatInfo.map((story) => story.title);
	const pageDescription = fetchMetadatInfo.map((story) => story.excerpt);
	return {
		title: `${pageTitle}`,
		description: `${pageDescription}`,
	};
}

export async function getSelectedStory(slug) {
	const selectedStory = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query SelectedStory{
				posts(where: {slug: "${slug}"}) {
					title
					tags
					author {
						name
						picture {
							url
						}
					}
					createdAt
					content{
						markdown
					}
					coverImage{
						url
					}
					coverImageCredits
				}
			}`,
		}),
	})
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
				<div className="min-w-full h-60 2xl:h-[500px] relative my-5">
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
		return <p className="text-2xl 2xl:text-lg mb-4">{paragraph.children}</p>;
	},
	h3: (heading) => {
		return <h3 className="text-2xl font-medium">{heading.children}</h3>;
	},
	a: (link) => {
		return (
			<a
				href={link.href}
				className="link link-hover text-dark-slate-gray dark:text-jet-stream font-medium"
			>
				{link.children}
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
	const storyContents = await getSelectedStory(params.slug);
	return (
		<div className="min-h-screen max-w-screen-lg flex flex-col justify-center items-center mx-auto px-8 text-center">
			{storyContents.map((story) => (
				<div key={story.title} className="">
					<h2 className="text-4xl">{story.title}</h2>
					{story.tags.map((storyGenre) => (
						<span
							className="dark:text-jet-stream text-dark-slate-gray font-medium flex flex-col justify-center items-center text-lg"
							key={storyGenre}
						>
							{storyGenre}
						</span>
					))}
					{/* cover image of the story */}
					<div className="w-full h-60 2xl:h-96 relative ">
						<Image
							src={story.coverImage.url}
							alt={`${story.title} cover image`}
							fill={true}
							style={{ objectFit: "cover" }}
							className="rounded-xl"
							priority={true}
							sizes="(max-width: 1536px) 100vw, 75vw"
						/>
					</div>
					{/* cover image credits */}
					<ReactMarkdown
						children={story.coverImageCredits}
						className="italic"
						components={{
							a: (link) => {
								return (
									<a
										href={link.href}
										referrerPolicy="no-referrer"
										target="_blank"
										className="link link-hover text-dark-slate-gray dark:text-jet-stream font-medium"
									>
										{link.children}
									</a>
								);
							},
						}}
					/>
					<ReactMarkdown
						children={story.content.markdown}
						className="text-start"
						components={CustomMarkdownComponents}
					/>
				</div>
			))}
		</div>
	);
}

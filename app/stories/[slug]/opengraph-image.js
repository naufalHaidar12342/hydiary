import { OPENGRAPH_IMAGE_SIZE } from "@/constants/ogimage_size";
import Image from "next/image";
import { ImageResponse } from "next/server";

// declare to vercel this function executed in edge runtime to load opengraph image
export const runtime = "edge";

// image metadata
export const alt = "Cover image of this post";

export const contentType = "image/png";

export async function getPostsContent(slug) {
	const postContent = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query PostsForOGImage{
                posts(where: {slug: "${slug}"}){
                    title
                    publishedAt
                    coverImage{
                        url
                    }
                }
            }`,
		}),
	}).then((res) => res.json());

	/* see the example response, 
    "data" is the outer layer of the json, then there's "posts" right below it.
    "posts" is an array, so we need array destructuring shown in [postContents] variables, therefore allows us to call the key inside array without specifying the index */
	const [postContents] = postContent.data.posts;
	return postContents;
}

// image generation function
export default async function OpenGraphImage({ params }) {
	const aksharRegular = fetch(
		new URL("../../Akshar-Regular.ttf", import.meta.url)
	).then((res) => res.arrayBuffer());
	const postBySlug = await getPostsContent(params.slug);
	return (
		new ImageResponse(
			(
				<div
					style={{
						color: "black",
						background: "#F6F6F6",
						height: "100%",
						width: "100%",
						display: "flex",
						textAlign: "center",
						alignItems: "center",
						justifyContent: "center",
						flexDirection: "column",
						flexWrap: "nowrap",
					}}
				>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							justifyItems: "center",
						}}
					>
						<Image
							src={postBySlug.coverImage.url}
							alt={`Cover image for ${postBySlug.title}`}
							width={600}
							height={500}
						/>
					</div>
					<div
						style={{
							fontSize: 60,
							fontFamily:
								"ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace;",
							letterSpacing: "-0.025em",
							color: "black",
							marginTop: 30,
							padding: "0 120px",
							lineHeight: 1.4,
							whiteSpace: "pre-wrap",
						}}
					>
						{postBySlug.title}
					</div>
				</div>
			)
		),
		{
			...OPENGRAPH_IMAGE_SIZE,
			fonts: [
				{
					name: "Akshar",
					data: await aksharRegular,
					style: "normal",
					weight: "400",
				},
			],
		}
	);
}

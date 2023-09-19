import Image from "next/image";
import { ImageResponse } from "next/server";

export const runtime = "edge";
export const defaultImage =
	"https://media.graphassets.com/d2AYZ6GCQTuHaL7YGs9m";
export const defaultImageCredits = "Photo by Glenn Carstens-Peters on Unsplash";

/* Photo by <a href="https://unsplash.com/@glenncarstenspeters?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Glenn Carstens-Peters</a> on <a href="https://unsplash.com/photos/npxXWgQ33ZQ?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a> */

export async function getPostBySlug(slug) {
	const postContent = await fetch(process.env.HYGRAPH_HIPERF_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			query: `query PostBySlug{
                posts(where: {slug: "${slug}"}) {
                    title
                    slug
                    date
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
	return postContent.data.posts;
}

export async function GET() {
	try {
		const { searchParams } = new URL(request.url);
		const slug = searchParams.get("slug");
		const postContent = await getPostBySlug(slug);
		const hasTitle = searchParams.has("title");
		const [titleFromPost] = postContent.title;
		const hasImage = searchParams.get("image");
		const image = hasImage ? searchParams.get("image") : defaultImage;
		const title = hasTitle
			? searchParams.get("title")?.slice(0, 100)
			: titleFromPost;

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
								src={image}
								alt="Logo of article"
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
							{title}
						</div>
					</div>
				)
			),
			{ width: 1200, height: 630 }
		);
	} catch (error) {}
}
